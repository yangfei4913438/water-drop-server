import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
      // password: process.env.REDIS_PWD,
      database: parseInt(process.env.REDIS_DB),
      ttl: parseInt(process.env.REDIS_TTL),
    }),
  ],
  providers: [RedisService], // 这里的 RedisService 一定要注入进来。
  exports: [RedisService], // 导出的地方，也需要写进来，否则外部无法调用。
})
export class RedisModule {}
