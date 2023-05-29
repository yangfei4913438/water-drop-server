import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// 这里就是一个 JWT 配置文件，校验逻辑不是写在这里的，需要到守卫文件里面去写。
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // token 从哪里找，这里标记是header。格式 Authorization: bearer JSON_WEB_TOKEN_STRING.....
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 默认为 false，表示由 Passport 模块来检查 JWT 是否已过期。 如果请求携带了一个过期的 JWT，该请求将会被拒绝，并响应 401
      ignoreExpiration: false,
      // 对称密钥，生产推荐使用 PEM 编码的公钥
      secretOrKey: process.env.JWT_SECRET,
    });
  }
}
