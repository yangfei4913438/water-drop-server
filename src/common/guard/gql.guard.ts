import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, private readonly userService: UserService) {
    super();
  }

  // 必须有的属性，否则无法正常获取上下文
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  // 解析 token 字符串
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // 这个方法决定了，token的校验逻辑。同时可以在上下文追加一点内容给其他功能去获取，比如装饰器。
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.error('没有token, 禁止访问');
      return false;
    }
    try {
      // 加密的时候只有id, 所以只能取出id
      const { id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userResult = await this.userService.findOne(id);
      // 把数据放到上下文中, 这样各种装饰器，才能获取到这里的数据
      request.userResult = userResult;
      request.user = userResult.data;
      return true;
    } catch (err) {
      console.error('内部错误，无法确认访问权限:', err.message);
      return false;
    }
  }
}
