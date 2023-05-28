import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageOutputType {
  @Field(() => Int, { description: '总数量' })
  total: number;
  @Field(() => Int, { description: '当前页码' })
  pageNum?: number;
  @Field(() => Int, { description: '每页的记录数量' })
  pageSize?: number;
}
