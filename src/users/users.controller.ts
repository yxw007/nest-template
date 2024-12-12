import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService, private configService: ConfigService) { }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
