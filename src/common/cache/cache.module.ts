import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
	imports: [
		CacheModule.register({
			ttl: 60 * 60, // 缓存时间（秒）
			max: 100, // 最大缓存数量
		}),
	],
	exports: [CacheModule],
})
export class GlobalCacheModule { }
