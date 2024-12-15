import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserBO } from './bo';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async findOne(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  create(userDto: CreateUserBO): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    return this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    const res = await this.userRepository.delete(userId);
    if (res.affected === 0) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }
}


