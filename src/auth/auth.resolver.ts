import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginType } from './dto/login.type';
import { AuthService } from './auth.service';
import { AuthResultType } from '@/auth/dto/auth.result.type';
import { ResultString } from '@/common/types/result.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginType, { description: '使用手机号去查询用户信息' })
  async smsLogin(@Args('tel') tel: string, @Args('code') code: string): Promise<AuthResultType> {
    return await this.authService.login(tel, code);
  }

  @Mutation(() => String, { description: '发送短信验证码' })
  async codeMessage(@Args('tel') tel: string): Promise<ResultString> {
    return await this.authService.codeMessage(tel);
  }
}
