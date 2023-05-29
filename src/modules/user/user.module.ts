import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver], // 这里的 UserService 一定要注入进来。
  exports: [UserService], // 导出的地方，也需要写进来，否则外部无法调用。
})
export class UserModule {}
