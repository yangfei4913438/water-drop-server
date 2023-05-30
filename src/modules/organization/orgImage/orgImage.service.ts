import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgImageEntity } from './orgImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrgImageService {
  constructor(
    @InjectRepository(OrgImageEntity)
    private readonly orgImageRepository: Repository<OrgImageEntity>
  ) {}

  async deleteByOrg(id): Promise<boolean> {
    const imgs = await this.orgImageRepository
      .createQueryBuilder('orgImage')
      .where(`orgImage.orgIdForFrontId = '${id}'`)
      .orWhere(`orgImage.orgIdForRoomId = '${id}'`)
      .orWhere(`orgImage.orgIdForOtherId = '${id}'`)
      .getMany();
    if (imgs.length === 0) {
      return true;
    }
    const delResult = await this.orgImageRepository.delete(imgs.map((item) => item.id));

    return delResult.affected > 0;
  }
}
