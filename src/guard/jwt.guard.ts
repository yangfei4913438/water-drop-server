import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlAuthGuard } from '@/guard/gql.guard';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly userService: UserService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = new GqlAuthGuard().getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.error('没有访问权限');
      return false;
    }
    try {
      // 加密的时候只有id, 所以只能取出id
      const { id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findOne(id);
      if (user) {
        // 校验完成，直接把用户数据返回
        request['user'] = user.data;
        return true;
      }
      console.error('用户不存在');
      return false;
    } catch {
      console.error('没有访问权限');
      return false;
    }
  }
}
