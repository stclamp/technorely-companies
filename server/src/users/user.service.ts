import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOneBy(condition);
  }

  async edit(user: any): Promise<User> {
    return this.userRepository.save(user);
  }
}
