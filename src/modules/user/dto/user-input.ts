import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  // Field 声明字段
  @Field({ description: '账号昵称' })
  name: string;

  @Field({ description: '账号描述', nullable: true })
  desc: string;

  @Field({ description: '账号头像', nullable: true })
  avatar: string;

  @Field({ description: '用户电话', nullable: true })
  tel: string;

  @Field({ description: '登录密码', nullable: true })
  password: string;

  @Field({ description: '登录账户', nullable: true })
  account: string;
}
