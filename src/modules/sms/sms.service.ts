import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import { Config } from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import { RedisService } from '../redis/redis.service';
import { randomCode } from './utils';
import { UserService } from '../user/user.service';

@Injectable()
export class SmsService {
  private smsClient: Dysmsapi20170525;

  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {
    const config = new Config({
      // 必填，您的 AccessKey ID
      accessKeyId: process.env.ACCESS_KEY,
      // 必填，您的 AccessKey Secret
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;

    this.smsClient = new Dysmsapi20170525(config);
  }

  async codeMessage(tel: string): Promise<string> {
    if (!tel) {
      throw new HttpException('手机号不能为空', HttpStatus.BAD_REQUEST);
    }
    // 查询缓存
    const code = await this.redisService.getValue<string>(tel);
    if (code) {
      throw new HttpException('3分钟内无法重复请求', HttpStatus.BAD_REQUEST);
    }
    // 验证码长4位
    const smsCode = randomCode(4);
    // 生成短信选项
    const smsOption = {
      signName: process.env.SIGNNAME, // 签名，阿里云申请的
      templateCode: process.env.TEMPLATECODE, // 模版代码，阿里云申请的
      phoneNumbers: tel,
      templateParam: `{"code":"${smsCode}"}`,
    };
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest(smsOption);
    const runtime = new $Util.RuntimeOptions({});
    try {
      const res = await this.smsClient.sendSmsWithOptions(
        sendSmsRequest,
        runtime,
      );
      if (res.body.code.toLowerCase() === 'ok') {
        // 有效时间3分钟
        await this.redisService.setValue(tel, smsCode, 60);
        // 返回验证码
        return smsCode;
      }
      console.error('ali exception:', res);
      throw new HttpException(
        res.body.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async smsLogin(tel: string, code: string) {
    const cache = await this.redisService.getValue(tel);
    if (cache === code) {
      const user = await this.userService.findByPhone(tel);
      if (user) {
        await this.redisService.del(tel);
        return user;
      }
      throw new HttpException('请求的用户不存在', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('你的验证码不匹配', HttpStatus.BAD_REQUEST);
    }
  }
}
