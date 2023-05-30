import { OrganizationEntity } from '@/modules/organization/organization.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 机构资源
 */
@Entity('org_image')
export class OrgImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    comment: '地址',
  })
  @IsNotEmpty()
  url: string;

  @Column({
    comment: '评论',
    nullable: true,
  })
  remark: string;

  // 多对一关系声明
  @ManyToOne(() => OrganizationEntity, (org) => org.orgFrontImg)
  orgIdForFront: OrganizationEntity;

  @ManyToOne(() => OrganizationEntity, (org) => org.orgRoomImg)
  orgIdForRoom: OrganizationEntity;

  @ManyToOne(() => OrganizationEntity, (org) => org.orgOtherImg)
  orgIdForOther: OrganizationEntity;
}
