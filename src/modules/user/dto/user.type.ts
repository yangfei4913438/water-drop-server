import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 返回的用户类型
 * 这里不要把用户密码返回！
 * */
@ObjectType()
export class UserType {
  @Field({ description: '用户id' })
  id?: string;

  @Field({ description: '用户昵称' })
  name?: string;

  @Field({ description: '账号描述' })
  desc?: string;

  @Field({ description: '账号头像' })
  avatar?: string;

  @Field({ description: '用户电话' })
  tel?: string;

  @Field({ description: '登录账户' })
  account?: string;
}
