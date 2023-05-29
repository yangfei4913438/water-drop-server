import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '@/modules/user/user.entity';

export const UserInfo = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserEntity => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
