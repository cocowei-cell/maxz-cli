import { join } from 'path';
import { NET_CONFIG } from './config/index';
import { connectMongoDb } from './utils';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileMiddleware } from './middleware/file.middleware';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  app.use(FileMiddleware);
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(join(__dirname, 'project'), {
    prefix: '/project',
  });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 15, // 15min
      max: 100,
    })
  );
  await app.listen(NET_CONFIG.port);
  connectMongoDb();
}

bootstrap();
