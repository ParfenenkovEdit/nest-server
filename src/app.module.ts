import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RedisMiddleware } from './middlewares/redis.middleware';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "db",
      "port": 3306,
      "username": "test",
      "password": "1234",
      "database": "nest",
      "entities": [UserEntity],
      "synchronize": true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedisMiddleware).forRoutes();
  }
}
