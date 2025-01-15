import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { cacheKeys } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) { }

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    const access_token = await this.jwtService.signAsync(payload);
    if (access_token) {
      this.cacheManager.set(cacheKeys.ACCESS_TOKEN, access_token, this.configService.get<number>("jwt.expiresIn") * 1000);
    }
    return {
      access_token,
    };
  }
}
