import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './entity/user';
import { CreateUserDto } from './dto';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/hello")
  @Public()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: number): Promise<void> {
    return this.userService.remove(userId);
  }
}
