import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import { Config } from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';

@Injectable()
export class SmsService {
  private smsClient: Dysmsapi20170525;

  constructor() {
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
    // 演示代码，所以这里没有生成短信校验的相关逻辑，正常需要有三个逻辑，生成、缓存、校验
    const testCode = '1234';
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: process.env.SIGNNAME, // 签名，阿里云申请的
      templateCode: process.env.TEMPLATECODE, // 模版代码，阿里云申请的
      phoneNumbers: tel,
      templateParam: `{"code":"${testCode}"}`,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      console.log('request:', sendSmsRequest);
      const res = await this.smsClient.sendSmsWithOptions(
        sendSmsRequest,
        runtime,
      );
      console.log('res:', res);
      // 返回验证码
      return testCode;
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
      return '';
    }
  }
}
