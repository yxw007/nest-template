import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entity/user';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<User>) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ userId });
  }

  create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.userName = userDto.userName;
    user.password = userDto.password;
    return this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}


