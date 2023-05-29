import { Global, Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [UserModule, JwtModule],
  providers: [OSSResolver, OSSService],
  exports: [OSSService],
})
export class OSSModule {}
