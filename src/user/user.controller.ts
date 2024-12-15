import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../common/decorators/public.decorator';
import { User } from './user.entity';
import { CreateUserBO } from './bo';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/hello")
  @Public()
  getHello(): string {
    return this.userService.getHello();
  }

  @Public()
  @Post("")
  create(@Body() user: CreateUserBO): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: number): Promise<void> {
    return this.userService.remove(userId);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
