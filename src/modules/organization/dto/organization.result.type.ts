import { ObjectType } from '@nestjs/graphql';
import { createResult, createResults } from '@/common/types/result.type';
import { OrganizationOutputType } from './organization.output.type';

@ObjectType({ description: '用户返回数据类型' })
export class OrganizationResultType extends createResult(OrganizationOutputType) {}

@ObjectType({ description: '用户返回分页数据类型' })
export class OrganizationResultsType extends createResults(OrganizationOutputType) {}
