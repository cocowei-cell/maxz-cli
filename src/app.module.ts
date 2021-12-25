import { LoginMiddleMiddleware } from './middleware/login-middle.middleware';
import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { WebsocketGateway } from './gateway/websocket.gateway';
import { MiddlewareConfig, RedisConf } from './config';
import { OsModule } from './modules/os/os.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [CacheModule.register(RedisConf), UserModule, ProjectModule, OsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR, // 配置Redis全局缓存
      useClass: CacheInterceptor,
    },
    AppService,
    WebsocketGateway,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleMiddleware)
      .exclude(...MiddlewareConfig.exclude)
      .forRoutes(...MiddlewareConfig.forRoutes);
  }
}
