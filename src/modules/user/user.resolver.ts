import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { ExecutionContext, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserInputType } from './dto/user.input.type';
import { JwtGuard } from '@/guard/jwt.guard';
import { GqlAuthGuard } from '@/guard/gql.guard';
import { PageInputType } from '@/common/types/page/page.input.type';
import { UserResultsType, UserResultType } from '@/modules/user/dto/user.result.type';
import { ResultBoolean } from '@/common/types/result.type';

@Resolver()
export class UserResolver {
  // 初始化用户操作实例
  constructor(private readonly userService: UserService) {}

  // 使用token获取用户信息
  @UseGuards(JwtGuard)
  @Query(() => UserResultType, { description: 'JWT鉴权：返回获取用户信息' })
  async profile(@Context() context: ExecutionContext): Promise<UserResultType> {
    if (context['req'].user) {
      return {
        code: 200,
        message: '认证成功',
        data: context['req'].user,
      };
    }
    return {
      code: 401,
      message: '认证失败',
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserResultType, { description: '使用id查询用户信息' })
  async find(@Args('id') id: string): Promise<UserResultType> {
    return await this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserResultsType, { description: '查询分页数据' })
  async findPageData(@Args('page') page: PageInputType): Promise<UserResultsType> {
    const { pageNum, pageSize } = page;
    return await this.userService.findPageData(
      pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      pageSize
    );
  }

  //todo 开发阶段，没办法对用户创建进行拦截，正式发布后需要加上统一JWT拦截(会有初始管理员账号)
  @Mutation(() => Boolean, { description: '创建用户' })
  async create(@Args('params') params: UserInputType): Promise<ResultBoolean> {
    return await this.userService.create(params);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { description: '更新用户信息' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInputType
  ): Promise<ResultBoolean> {
    return await this.userService.update(id, params);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { description: '删除用户' })
  async delete(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.userService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { description: '永久删除用户' })
  async deleteForever(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.userService.deleteForever(id);
  }
}
