import { ObjectType } from '@nestjs/graphql';

import { createResult } from '@/common/types/result.type';

import { LoginType } from './login.type';

@ObjectType({ description: '权限相关返回数据类型' })
export class AuthResultType extends createResult(LoginType) {}
