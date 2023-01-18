import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
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
    @Body('numOfEmployees')
    numOfEmployees: string,
    @Body('nickname')
    nickname: string,
    @Body('description')
    description: string,
    @Body('position')
    position: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      numOfEmployees,
      nickname,
      description,
      position,
    });
  }

  @Post('signin')
  async login(
    @Body('email')
    email: string,
    @Body('password')
    password: string,
  ) {
    const user = await this.userService.find(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    return jwt;
  }
}
