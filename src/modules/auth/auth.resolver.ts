import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInfo } from './dto/loginInfo';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginInfo, { description: '使用手机查询用户信息' })
  async smsLogin(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<LoginInfo> {
    return await this.authService.login(tel, code);
  }

  @Mutation(() => String, { description: '发送短信验证码' })
  async codeMessage(@Args('tel') tel: string): Promise<string> {
    return await this.authService.codeMessage(tel);
  }
}
