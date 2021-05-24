import { Connection } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'userRepo',
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];