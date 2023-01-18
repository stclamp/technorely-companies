import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './companies/company.module';
import { databaseConfig } from './config/configuration';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    CompanyModule,
    UserModule,
  ],
})
export class AppModule {}
