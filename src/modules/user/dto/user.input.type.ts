import { Field, InputType } from '@nestjs/graphql';

/**
 * 用户输入的数据结构，存在所有的用户可输入字段
 * 这里没有 ID 字段！
 * */
@InputType({ description: '输入的用户数据类型' })
export class UserInputType {
  @Field(() => String, { description: '用户类型: student,teacher,admin', nullable: true })
  userType: string;

  @Field(() => Boolean, {
    description: '账号是否被禁用：用户无法登陆，但可以查询出用户信息',
    nullable: true,
  })
  disabled: boolean;

  @Field(() => String, { description: '用户昵称', nullable: true })
  name: string;

  @Field(() => String, { description: '用户描述', nullable: true })
  desc: string;

  @Field(() => String, { description: '用户头像', nullable: true })
  avatar: string;

  @Field(() => String, { description: '用户登录手机号', nullable: true })
  tel: string;

  @Field(() => String, { description: '用户登录登录密码', nullable: true })
  password: string;

  @Field(() => String, { description: '用户登录账号', nullable: true })
  account: string;
}
