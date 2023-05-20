import { Query, Resolver } from '@nestjs/graphql';
import { OSSType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query(() => OSSType, { description: '获取 oss 相关信息' })
  async ossInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
