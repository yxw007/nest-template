import { Module } from '@nestjs/common';
import { UserController } from '../users/users.controller';
import { UserService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';
import { configSchema, configuration } from '../../config/configuration';
import { normalizePath } from 'src/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: normalizePath(`${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`),
      load: [configuration],
      validationSchema: configSchema,
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
