import { CacheKey, CacheTTL, CACHE_MANAGER, Controller, Get, HttpException, Inject, Sse } from '@nestjs/common';
import { interval, map } from 'rxjs';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  // @Sse('/see')
  // handle() {
  //   return interval(1000).pipe(
  //     map(_ => ({
  //       data: null,
  //       msg: 'ok',
  //       code: 123,
  //     }))
  //   );
  // }
  @CacheKey('see_key') // 方法缓存
  @CacheTTL(200) // 过期时间  最终缓存的是返回结果 {"data":[1,2,3,4,5,6],"code":200,"msg":"success"}
  @Get('/see')
  async handle() {
    console.log(12312); // 如果被缓存后，这里的数据将只打印一次
    return [1, 2, 3, 4, 5, 6];
  }
}
