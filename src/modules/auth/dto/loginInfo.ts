import { UserType } from '@/modules/user/dto/user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginInfo {
  @Field({ description: '用户信息' })
  user: UserType;
  @Field({ description: 'token' })
  token: string;
}
