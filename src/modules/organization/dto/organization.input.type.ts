import { Field, InputType } from '@nestjs/graphql';
import { OrgImageInput } from '@/modules/organization/orgImage/dto/orgImage.input';

/**
 * 组织输入的数据结构，存在所有的组织可输入字段
 * 这里没有 ID 字段！
 * */
@InputType({ description: '输入的门店数据类型' })
export class OrganizationInputType {
  @Field({
    description: '名称',
  })
  name: string;

  @Field({
    description: 'logo',
  })
  logo: string;

  @Field({
    description: '手机号',
    nullable: true,
  })
  tel: string;

  @Field({
    description: 'tags',
    nullable: true,
  })
  tags: string;

  @Field({
    description: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  address: string;

  @Field({
    description: '营业执照',
  })
  businessLicense: string;

  @Field({
    description: 'description',
  })
  description: string;

  @Field({
    description: '法人身份证正面',
  })
  identityCardFrontImg: string;

  @Field({
    description: '法人身份证反面',
  })
  identityCardBackImg: string;

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: '机构门面照片',
  })
  orgFrontImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: '机构环境照片',
  })
  orgRoomImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], {
    nullable: true,
    description: '机构环境照片',
  })
  orgOtherImg?: OrgImageInput[];
}
