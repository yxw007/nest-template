import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller()
export class UserController {
  constructor(private readonly appService: UsersService, private configService: ConfigService) { }

  @Get("/hello")
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
