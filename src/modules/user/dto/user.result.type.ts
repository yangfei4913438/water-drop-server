import { ObjectType } from '@nestjs/graphql';

import { IResult, IResults } from '@/common/types/result.type';

import { UserOutputType } from './user.output.type';

@ObjectType({ description: '用户返回数据类型' })
export class UserResultType extends IResult<UserOutputType> {}

@ObjectType({ description: '用户返回布尔数据类型' })
export class UserBooleanResultType extends IResult<boolean> {}

@ObjectType({ description: '用户返回分页数据类型' })
export class UserResultsType extends IResults<UserOutputType> {}
