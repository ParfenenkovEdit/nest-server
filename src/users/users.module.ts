import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { UsersController } from "./users.controller";
import { userProviders } from './users.providers';
import { UsersService } from "./users.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
      ...userProviders,
      UsersService
    ],
    exports: [UsersService]
  })
export class UsersModule {}