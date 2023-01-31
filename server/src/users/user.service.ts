import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async createAdmin() {
    const admin = await this.findOne({ email: 'admin@admin.com' });

    const password = await bcrypt.hash('admin', 12);

    if (!admin) {
      return this.create({
        email: 'admin@admin.com',
        password: password,
        firstName: 'Admin',
        lastName: 'Admin',
        phone: '+3809999999',
        nickname: 'admin',
        description: 'Admin',
        position: 'Admin',
        role: 'admin',
      });
    }
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOneBy(condition);
  }

  async edit(user: any): Promise<User> {
    return this.userRepository.save(user);
  }
}
