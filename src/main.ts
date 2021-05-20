import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

const PORT = config.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
