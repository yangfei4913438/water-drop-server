import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import OSS from 'ali-oss';
import { OSSType } from './dto/oss.type';

@Injectable()
export class OSSService {
  /**
   * @description 获取 OSS 上传签名
   * @see https://help.aliyun.com/document_detail/31926.html
   * @return {*}  {Promise<OSSType>}
   * @memberof OSSService
   */
  async getSignature(): Promise<OSSType> {
    const config = {
      accessKeyId: process.env.ACCESS_KEY,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      host: process.env.OSS_BUCKET_DOMAIN,
      bucket: 'yangfei-assets',
      dir: 'images/',
    };

    const client = new OSS(config);

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
    };

    //签名
    const formData = await client.calculatePostSignature(policy);

    //返回参数
    return {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host: config.host,
      dir: config.dir,
    };
  }
}
