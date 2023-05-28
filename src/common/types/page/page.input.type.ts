import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class PageInputType {
  @Field(() => Int, { description: '分页页码' })
  @IsInt()
  @Min(0)
  pageNum: number;

  @Field(() => Int, { description: '分页的每页记录数量' })
  @IsInt()
  @Min(0)
  pageSize: number;
}
