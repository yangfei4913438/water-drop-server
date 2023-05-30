import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@/modules/user/user.module';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Global()
@Module({
  imports: [UserModule, JwtModule],
  providers: [OSSResolver, OSSService],
  exports: [OSSService],
})
export class OSSModule {}
