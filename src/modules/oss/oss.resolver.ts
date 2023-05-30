import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guard/gql.guard';
import { OSSType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => OSSType, { description: '获取 oss 相关信息' })
  async ossInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
