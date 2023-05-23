import { Module } from '@nestjs/common';
import { SmsResolver } from './sms.resolver';
import { SmsService } from './sms.service';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [RedisModule, UserModule], // 使用其他模块的时候，需要线导入，然后才能在服务里面注入使用
  providers: [SmsResolver, SmsService],
  exports: [SmsService],
})
export class SmsModule {}
