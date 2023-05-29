import { ClassType } from 'type-graphql';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageOutputType } from '@/common/types/page/page.output.type';

export interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}

export interface IResults<T> {
  code: number;
  message: string;
  data?: T[];
  page?: PageOutputType;
}

export function createResult<T>(ItemType: ClassType<T>): ClassType<IResult<T>> {
  @ObjectType({ description: '非分页返回数据结构' })
  class Result implements IResult<T> {
    @Field(() => Int, { description: 'http状态码' })
    code: number;
    @Field(() => String, { description: 'http提示信息' })
    message: string;
    @Field(() => ItemType, { description: '数据', nullable: true })
    data?: T;
  }
  return Result;
}

export function createResults<T>(ItemTypes: ClassType<T>): ClassType<IResults<T>> {
  @ObjectType({ description: '分页返回数据结构' })
  class Results implements IResults<T> {
    @Field(() => Int, { description: 'http状态码' })
    code: number;
    @Field(() => String, { description: 'http提示信息' })
    message: string;
    @Field(() => [ItemTypes], { description: '列表数据', nullable: true })
    data?: T[];
    @Field(() => PageOutputType, { description: '分页信息', nullable: true })
    page?: PageOutputType;
  }
  return Results;
}

@ObjectType({ description: '字符串数据结构返回' })
export class ResultString implements IResult<string> {
  @Field(() => Int, { description: 'http状态码' })
  code: number;
  @Field(() => String, { description: 'http提示信息' })
  message: string;
  @Field(() => String, { description: '字符串数据', nullable: true })
  data?: string;
}

@ObjectType({ description: '布尔数据结构返回' })
export class ResultBoolean implements IResult<boolean> {
  @Field(() => Int, { description: 'http状态码' })
  code: number;
  @Field(() => String, { description: 'http提示信息' })
  message: string;
  @Field(() => Boolean, { description: '布尔值数据', nullable: true })
  data?: boolean;
}
