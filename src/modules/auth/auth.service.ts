import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import { Config } from '@alicloud/openapi-client';
import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $Util from '@alicloud/tea-util';
import { randomCode } from '@/utils';
import { RedisService } from '@/common/redis/redis.service';
import { ResultString } from '@/common/types/result.type';
import { UserService } from '@/modules/user/user.service';
import { AuthResultType } from '@/modules/auth/dto/auth.result.type';

@Injectable()
export class AuthService {
  private smsClient: Dysmsapi20170525;

  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService
  ) {
    const config = new Config({
      // 必填，您的 AccessKey ID
      accessKeyId: process.env.ACCESS_KEY,
      // 必填，您的 AccessKey Secret
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      // 访问的域名
      endpoint: 'dysmsapi.aliyuncs.com',
    });
    this.smsClient = new Dysmsapi20170525(config);
  }

  async codeMessage(tel: string): Promise<ResultString> {
    if (!tel) {
      return {
        code: 400,
        message: '手机号不能为空',
      };
    }
    // 查询缓存
    const code = await this.redisService.getValue<string>(tel);
    if (code) {
      // 返回缓存数据
      // 如果是生产业务系统，需要再调用一次短信发送接口，这里是测试环境，没办法频繁发送短信，所以只是通过接口返回，
      // 区别就是，验证码是从redis里取出来的，不是重新生成的。
      return {
        code: 200,
        message: '验证码还在有效期',
        data: code,
      };
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
      const res = await this.smsClient.sendSmsWithOptions(sendSmsRequest, runtime);
      if (res.body.code.toLowerCase() === 'ok') {
        // 有效时间3分钟: 3s * 60 ，测试改成 3 天
        await this.redisService.setValue(tel, smsCode, 3 * 60 * 60 * 24);
        // 返回验证码
        return {
          code: 200,
          message: '短信发送成功',
          data: smsCode,
        };
      }
      console.error('ali sms exception:', res);
      return {
        code: 500,
        message: '短信服务异常: ' + res.body.message,
      };
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  async login(tel: string, code: string): Promise<AuthResultType> {
    try {
      const cache = await this.redisService.getValue<string>(tel);
      if (cache === code) {
        const res = await this.userService.findByPhone(tel);
        if (res.code === 200) {
          // 这里测试，就线不删除了。
          // await this.redisService.del(tel);
          const token = this.jwtService.sign({ id: res.data.id });
          return {
            code: 200,
            message: '登陆成功',
            data: { user: res.data, token },
          };
        }
        return {
          code: res.code,
          message: res.message,
        };
      } else {
        return {
          code: 401,
          message: '你的验证码不匹配',
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }
}
