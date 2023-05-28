import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  // Field 声明字段
  @Field({ description: '用户昵称' })
  name: string;

  @Field({ description: '用户描述', nullable: true })
  desc: string;

  @Field({ description: '用户头像', nullable: true })
  avatar: string;

  @Field({ description: '用户登录手机号', nullable: true })
  tel: string;

  @Field({ description: '用户登录登录密码', nullable: true })
  password: string;

  @Field({ description: '用户登录账号', nullable: true })
  account: string;
}
