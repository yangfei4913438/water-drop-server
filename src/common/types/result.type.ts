import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageOutputType } from '@/common/types/page/page.output.type';
import { Any } from 'typeorm';

@ObjectType({ description: '非分页返回数据结构' })
export class IResult<T> {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
  @Field(() => Any<T>, { description: '数据', nullable: true })
  data?: T;
}

@ObjectType({ description: '分页返回数据结构' })
export class IResults<T> {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
  @Field(() => Array<T>, { description: '列表数据', nullable: true })
  data?: T[];
  @Field(() => PageOutputType, { description: '分页信息', nullable: true })
  page?: PageOutputType;
}
