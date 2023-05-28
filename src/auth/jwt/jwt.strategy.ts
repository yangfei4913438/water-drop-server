import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserOutputType } from '@/modules/user/dto/user.output.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // token 从哪里找，这里标记是header。格式 Authorization: bearer JSON_WEB_TOKEN_STRING.....
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 将jwt的有效期管理，托管给passport
      ignoreExpiration: false,
      // 对称密钥，生产推荐使用 PEM 编码的公钥
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(user: UserOutputType): Promise<UserOutputType> {
    if (!user.id) {
      // 用户id都没有，肯定没有访问权限，抛出 401 异常
      throw new UnauthorizedException();
    }
    // 返回用户id，用户名称
    return user;
  }
}
