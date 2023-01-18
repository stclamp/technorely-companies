import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import appConfig from './app.config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: appConfig().appHost,
    port: appConfig().appPort,
    username: appConfig().appUsername,
    password: appConfig().appPassword,
    database: appConfig().appDatabase,
    entities: [User],
    synchronize: true,
  }),
};
