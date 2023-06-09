import { ExecutionContext, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultString } from '@/common/types/result.type';
import { GqlAuthGuard } from '@/common/guard/gql.guard';
import { AuthResultType } from '@/modules/auth/dto/auth.result.type';
import { UserResultType } from '@/modules/user/dto/user.result.type';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 使用token获取用户信息
  @UseGuards(GqlAuthGuard)
  @Query(() => UserResultType, { description: 'JWT鉴权：返回获取用户信息' })
  async profile(@Context() ctx: ExecutionContext): Promise<UserResultType> {
    if (ctx['req'].userResult) {
      return ctx['req'].userResult;
    }
    return {
      code: 401,
      message: '认证失败',
    };
  }

  @Mutation(() => AuthResultType, { description: '使用手机号去查询用户信息' })
  async smsLogin(@Args('tel') tel: string, @Args('code') code: string): Promise<AuthResultType> {
    return await this.authService.login(tel, code);
  }

  @Mutation(() => ResultString, { description: '发送短信验证码' })
  async codeMessage(@Args('tel') tel: string): Promise<ResultString> {
    return await this.authService.codeMessage(tel);
  }
}
