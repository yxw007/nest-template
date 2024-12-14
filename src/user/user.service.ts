import { Injectable } from '@nestjs/common';
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
    return this.userRepository.findOneBy({ username });
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ userId });
  }

  create(userDto: CreateUserBO): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    return this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}


