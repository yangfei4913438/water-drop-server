import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from '@/modules/common/base.type';

/**
 * 返回的用户类型
 * 这里不要把用户密码返回！
 * */
@ObjectType()
export class UserType extends BaseType {
  @Field({ description: '用户id' })
  id: string;

  @Field({ description: '用户昵称' })
  name?: string;

  @Field({ description: '用户描述' })
  desc?: string;

  @Field({ description: '用户头像' })
  avatar?: string;

  @Field({ description: '用户登录手机号' })
  tel?: string;

  @Field({ description: '用户登录账号' })
  account?: string;
}
