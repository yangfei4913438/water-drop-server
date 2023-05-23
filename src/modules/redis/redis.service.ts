import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // 从缓存中检索项目
  getValue<T>(key: string): Promise<T> {
    return this.cacheManager.get(key);
  }

  // 将项目添加到缓存
  // 默认禁用缓存过期，单位：秒
  setValue<T>(key: string, value: T, ttl = 0) {
    // from cache-manager v5 they use milliseconds instead of seconds
    return this.cacheManager.set(key, value, ttl * 1000);
  }

  // 从缓存中删除某个项目
  del(key: string) {
    return this.cacheManager.del(key);
  }

  // 清除所有缓存
  reset() {
    return this.cacheManager.reset();
  }
}
