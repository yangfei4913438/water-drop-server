import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OrganizationEntity } from './organization.entity';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { OrgImageService } from '@/modules/organization/orgImage/orgImage.service';
import { OrgImageEntity } from '@/modules/organization/orgImage/orgImage.entity';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule, JwtModule, TypeOrmModule.forFeature([OrganizationEntity, OrgImageEntity])],
  providers: [OrganizationService, OrganizationResolver, OrgImageService],
  exports: [OrganizationService], // 导出的地方，也需要写进来，否则外部无法调用。
})
export class OrganizationModule {}
