import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RedisMiddleware } from './middlewares/redis.middleware';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    UsersModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedisMiddleware).forRoutes('users');
  }
}
