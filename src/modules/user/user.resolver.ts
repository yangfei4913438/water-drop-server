import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserInputType } from './dto/user.input.type';
import { GqlAuthGuard } from '@/guard/gql.guard';
import { PageInputType } from '@/common/types/page/page.input.type';
import { UserResultsType, UserResultType } from '@/modules/user/dto/user.result.type';
import { ResultBoolean } from '@/common/types/result.type';
import { UserInfo } from '@/decorators/user.decorator';
import { UserEntity } from '@/modules/user/user.entity';

@Resolver()
export class UserResolver {
  // 初始化用户操作实例
  constructor(private readonly userService: UserService) {}

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
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '创建用户' })
  async create(
    @Args('params') params: UserInputType,
    @UserInfo() user: UserEntity
  ): Promise<ResultBoolean> {
    return await this.userService.create({ ...params, createdBy: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '更新用户信息' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInputType,
    @UserInfo() user: UserEntity
  ): Promise<ResultBoolean> {
    return await this.userService.update(id, { ...params, updatedBy: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '删除用户' })
  async delete(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.userService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '永久删除用户' })
  async deleteForever(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.userService.deleteForever(id);
  }
}
