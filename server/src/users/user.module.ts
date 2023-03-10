import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { typeOrmConfig } from 'src/config/typeOrm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
