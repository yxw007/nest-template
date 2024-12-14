import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSchema, configuration } from '../../config/configuration';
import { normalizePath } from 'src/common/utils';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: normalizePath(`${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`),
      load: [configuration],
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [normalizePath(__dirname + '/../**/*.entity{.ts,.js}')],
        synchronize: configService.get<string>("NODE_ENV") === "development",
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }
