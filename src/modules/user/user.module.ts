import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver], // 这里的 UserService 一定要注入进来。
  exports: [UserService], // 导出的地方，也需要写进来，否则外部无法调用。
})
export class UserModule {}
