import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from '@/auth/auth.resolver';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // 默认策略
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 签名密钥
      signOptions: {
        expiresIn: '3d', // jwt密钥过期时间 3 天
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
