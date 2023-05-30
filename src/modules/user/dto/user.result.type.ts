import { ObjectType } from '@nestjs/graphql';
import { createResult, createResults } from '@/common/types/result.type';
import { UserOutputType } from './user.output.type';

@ObjectType({ description: '用户返回数据类型' })
export class UserResultType extends createResult(UserOutputType) {}

@ObjectType({ description: '用户返回分页数据类型' })
export class UserResultsType extends createResults(UserOutputType) {}
