import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlAuthGuard } from '@/modules/guard/gql.guard';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = new GqlAuthGuard().getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 加密的时候只有id, 所以只能取出id
      const { id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = await this.userService.findOne(id);
      // console.log('user:', user);
      // 校验完成，直接把用户数据返回
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
