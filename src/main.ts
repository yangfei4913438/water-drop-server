import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启跨域
  app.enableCors({
    origin: ['http://localhost:5001', 'http://localhost:5002'],
  });
  await app.listen(3000);
}
bootstrap();
