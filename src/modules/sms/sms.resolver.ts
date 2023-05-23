import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SmsService } from './sms.service';

@Resolver()
export class SmsResolver {
  constructor(private readonly smsService: SmsService) {}

  @Mutation(() => String, { description: '发送短信验证码' })
  async codeMessage(@Args('tel') tel: string): Promise<string> {
    return await this.smsService.codeMessage(tel);
  }
}
