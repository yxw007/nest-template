import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Public } from '../auth/decorators/public.decorator';

@Controller("users")
export class UserController {
  constructor(private readonly appService: UserService, private configService: ConfigService) { }

  @Get("/hello")
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
