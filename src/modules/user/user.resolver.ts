import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { ExecutionContext, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserInput } from './dto/user-input';
import { UserType } from './dto/user.type';
import { JwtGuard } from '@/modules/guard/jwt.guard';

@Resolver()
export class UserResolver {
  // 初始化用户操作实例
  constructor(private readonly userService: UserService) {}

  // 使用token获取用户信息
  @UseGuards(JwtGuard)
  @Query(() => UserType, { description: '' })
  async profile(@Context() context: ExecutionContext): Promise<UserType> {
    return context['req'].user;
  }

  @Query(() => UserType, { description: '使用id查询用户信息' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => Boolean, { description: '创建用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Mutation(() => Boolean, { description: '更新用户信息' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async remove(@Args('id') id: string): Promise<boolean> {
    return await this.userService.remove(id);
  }
}
