import { Global, Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';
import { UserModule } from '@/modules/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [OSSResolver, OSSService],
  exports: [OSSService],
})
export class OSSModule {}
