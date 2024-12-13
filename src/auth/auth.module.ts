import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { normalizePath } from 'src/common/utils';
import { configSchema, configuration } from 'config/configuration';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: normalizePath(`${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`),
			load: [configuration],
			validationSchema: configSchema,
		}),
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
		}),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule { }
