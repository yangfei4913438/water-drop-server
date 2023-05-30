import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from '@/common/types/base.type';
import { OrgImageType } from '@/modules/organization/orgImage/dto/orgImage.output';

/**
 * 返回的用户类型
 * 这里不要把用户密码返回！
 * */
@ObjectType({ description: '返回的用户数据类型' })
export class OrganizationOutputType extends BaseType {
  @Field(() => String, { description: '门店ID' })
  id: string;

  @Field(() => String, { description: '营业执照' })
  businessLicense: string;

  @Field(() => String, { description: '法人身份证正面' })
  identityCardFrontImg: string;

  @Field(() => String, { description: '法人身份证反面' })
  identityCardBackImg: string;

  @Field(() => String, { description: '标签以，隔开' })
  tags: string;

  @Field(() => String, { description: '简介' })
  description: string;

  @Field(() => String, { description: '机构名' })
  name: string;

  @Field(() => String, { description: 'logo' })
  logo: string;

  @Field(() => String, { description: '地址' })
  address: string;

  @Field(() => String, { description: '电话' })
  tel: string;

  @Field(() => String, { description: '经度', nullable: true })
  longitude: string;

  @Field(() => String, { description: '纬度', nullable: true })
  latitude: string;

  @Field(() => [OrgImageType], { nullable: true, description: '封面图' })
  orgFrontImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: '室内图' })
  orgRoomImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: '其他图' })
  orgOtherImg?: OrgImageType[];
}
