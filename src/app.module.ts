import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RedisMiddleware } from './middlewares/redis.middleware';


@Module({
  imports: [
    UsersModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedisMiddleware).forRoutes('users');
  }
}
