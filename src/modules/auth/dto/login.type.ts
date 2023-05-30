import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutputType } from '@/modules/user/dto/user.output.type';

@ObjectType({ description: '返回的登陆数据类型' })
export class LoginType {
  @Field(() => UserOutputType, { description: '用户信息' })
  user: UserOutputType;
  @Field(() => String, { description: 'token' })
  token: string;
}
