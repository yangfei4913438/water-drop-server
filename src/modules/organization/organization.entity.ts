import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/common/types/base.entity';
import { OrgImageEntity } from './orgImage/orgImage.entity';

@Entity('organization')
export class OrganizationEntity extends BaseEntity {
  @Column({ comment: '营业执照' })
  @IsNotEmpty()
  businessLicense: string;

  @Column({ comment: '法人身份证正面' })
  @IsNotEmpty()
  identityCardFrontImg: string;

  @Column({ comment: '法人身份证反面' })
  @IsNotEmpty()
  identityCardBackImg: string;

  @Column({
    type: 'text', // 如果不指定，就会变成 varchar(255)
    comment: '标签以，隔开',
    nullable: true,
  })
  tags: string;

  @Column({
    type: 'text',
    comment: '简介',
    nullable: true,
  })
  description: string;

  @Column({
    comment: '机构名',
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    comment: 'logo',
    nullable: true,
  })
  logo: string;

  @Column({
    comment: '地址',
    nullable: true,
  })
  address: string;

  @Column({
    comment: '经度',
    nullable: true,
  })
  longitude: string;

  @Column({
    comment: '纬度',
    nullable: true,
  })
  latitude: string;

  @Column({
    comment: '电话',
    nullable: true,
  })
  tel: string;

  // 一对多关系声明
  @OneToMany(() => OrgImageEntity, (orgImage) => orgImage.orgIdForFront, {
    cascade: true,
  })
  orgFrontImg?: OrgImageEntity[];

  @OneToMany(() => OrgImageEntity, (orgImage) => orgImage.orgIdForRoom, {
    cascade: true,
  })
  orgRoomImg?: OrgImageEntity[];

  @OneToMany(() => OrgImageEntity, (orgImage) => orgImage.orgIdForOther, {
    cascade: true,
  })
  orgOtherImg?: OrgImageEntity[];
}
