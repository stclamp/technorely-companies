import {
  BadRequestException,
  UnauthorizedException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async register(
    @Body('email')
    email: string,
    @Body('password')
    password: string,
    @Body('firstName')
    firstName: string,
    @Body('lastName')
    lastName: string,
    @Body('phone')
    phone: string,
    @Body('nickname')
    nickname: string,
    @Body('description')
    description: string,
    @Body('position')
    position: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      nickname,
      description,
      position,
    });

    delete user.password;

    return user;
  }

  @Post('signin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const lowerEmail = email.toLowerCase();
    const user = await this.userService.findOne({ email: lowerEmail });

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Incorrect email or password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return { ...user, jwt };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success logout',
    };
  }

  @Post('edit')
  async edit(
    @Body('email')
    email: string,
    @Body('firstName')
    firstName: string,
    @Body('lastName')
    lastName: string,
    @Body('phone')
    phone: string,
    @Body('nickname')
    nickname: string,
    @Body('description')
    description: string,
    @Body('position')
    position: string,
  ) {
    const user = await this.userService.findOne({ email });
    user.email = email.toLowerCase();
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.nickname = nickname;
    user.description = description;
    user.position = position;

    return this.userService.edit(user);
  }
}
