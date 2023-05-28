import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseType {
  @Field(() => String, { description: '数据ID' })
  id: string;

  @Field(() => Date, { description: '记录创建时间' })
  createdAt: Date;

  @Field(() => String, { nullable: true, description: '记录创建用户' })
  createdBy: string;

  @Field(() => Date, { nullable: true, description: '记录更新时间' })
  updatedAt: Date;

  @Field(() => String, { nullable: true, description: '记录更新用户' })
  updatedBy: string;

  @Field(() => Date, { nullable: true, description: '记录删除时间' })
  deletedAt: Date;

  @Field(() => String, { nullable: true, description: '记录删除用户' })
  deletedBy: string;
}
