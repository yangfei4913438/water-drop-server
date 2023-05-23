import { Module } from '@nestjs/common';
import { SmsResolver } from './sms.resolver';
import { SmsService } from './sms.service';

@Module({
  imports: [],
  providers: [SmsResolver, SmsService],
  exports: [],
})
export class SmsModule {}
