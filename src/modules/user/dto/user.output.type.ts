import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from '@/common/types/base.type';

/**
 * 返回的用户类型
 * 这里不要把用户密码返回！
 * */
@ObjectType({ description: '返回的用户数据类型' })
export class UserOutputType extends BaseType {
  @Field(() => String, { description: '用户ID' })
  id: string;

  @Field(() => String, { description: '用户类型: student,teacher,admin' })
  userType: string;

  @Field(() => String, { description: '账号是否被禁用：用户无法登陆，但可以查询出用户信息' })
  disabled: boolean;

  @Field(() => String, { description: '用户昵称' })
  name: string;

  @Field(() => String, { description: '用户描述' })
  desc: string;

  @Field(() => String, { description: '用户头像' })
  avatar: string;

  @Field(() => String, { description: '用户登录手机号' })
  tel: string;

  @Field(() => String, { description: '用户登录账号' })
  account: string;
}
