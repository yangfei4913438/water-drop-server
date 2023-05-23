import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}

  // 从缓存中检索项目
  getValue<T>(key: string): Promise<T> | T {
    return this.cacheManager.get(key);
  }

  // 将项目添加到缓存
  // 默认禁用缓存过期，单位：秒
  setValue<T>(key: string, value: T, ttl = 0): Promise<void> | void {
    // from cache-manager v5 they use milliseconds instead of seconds
    return this.cacheManager.set(key, value, { ttl });
  }

  // 从缓存中删除某个项目
  del(key: string): Promise<void> | void {
    return this.cacheManager.del(key);
  }
}
