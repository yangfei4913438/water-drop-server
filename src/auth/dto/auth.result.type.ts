import { ObjectType } from '@nestjs/graphql';

import { IResult } from '@/common/types/result.type';

import { LoginType } from './login.type';

@ObjectType({ description: '权限相关返回数据类型' })
export class AuthResultType extends IResult<LoginType> {}

@ObjectType({ description: '权限相关返回, 字符串数据类型' })
export class AuthStringResultType extends IResult<string> {}
