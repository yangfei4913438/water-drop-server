import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guard/gql.guard';
import { PageInputType } from '@/common/types/page/page.input.type';
import { ResultBoolean } from '@/common/types/result.type';
import { UserInfo } from '@/common/decorators/user.decorator';
import { UserEntity } from '@/modules/user/user.entity';
import { OrganizationService } from './organization.service';
import { OrganizationInputType } from './dto/organization.input.type';
import { OrganizationResultsType, OrganizationResultType } from './dto/organization.result.type';
import { FindOptionsWhere, Like } from 'typeorm';
import { OrganizationEntity } from '@/modules/organization/organization.entity';

@Resolver()
export class OrganizationResolver {
  // 初始化用户操作实例
  constructor(private readonly service: OrganizationService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => OrganizationResultType, { description: '使用id查询用户信息' })
  async orgInfo(@Args('id') id: string): Promise<OrganizationResultType> {
    return await this.service.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => OrganizationResultsType, { description: '查询分页数据' })
  async orgPageData(
    @Args('page') page: PageInputType,
    @UserInfo() user: UserEntity,
    @Args('name', { nullable: true }) name?: string
  ): Promise<OrganizationResultsType> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<OrganizationEntity> = { createdBy: user.id };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    return await this.service.findPageData(
      pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      pageSize,
      where
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '创建组织' })
  async orgCreate(
    @Args('params') params: OrganizationInputType,
    @UserInfo() user: UserEntity
  ): Promise<ResultBoolean> {
    return await this.service.create({ ...params, createdBy: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '更新组织信息' })
  async orgUpdate(
    @Args('id') id: string,
    @Args('params') params: OrganizationInputType,
    @UserInfo() user: UserEntity
  ): Promise<ResultBoolean> {
    return await this.service.update(id, { ...params, updatedBy: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '删除组织' })
  async orgDelete(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.service.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultBoolean, { description: '永久删除组织' })
  async orgDeleteForever(@Args('id') id: string): Promise<ResultBoolean> {
    return await this.service.deleteForever(id);
  }
}
