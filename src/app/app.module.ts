import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema, configuration } from '../../config/configuration';
import { normalizePath } from 'src/common/utils';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: normalizePath(`${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`),
      load: [configuration],
      validationSchema: configSchema,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
