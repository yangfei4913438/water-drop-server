import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SmsService } from './sms.service';
import { UserType } from '../user/dto/user.type';

@Resolver()
export class SmsResolver {
  constructor(private readonly smsService: SmsService) {}

  @Query(() => UserType, { description: '使用手机查询用户信息' })
  async smsLogin(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<UserType> {
    return await this.smsService.smsLogin(tel, code);
  }

  @Mutation(() => String, { description: '发送短信验证码' })
  async codeMessage(@Args('tel') tel: string): Promise<string> {
    return await this.smsService.codeMessage(tel);
  }
}
