import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserBO {
	@IsString()
	@IsNotEmpty()
	readonly username: string;

	@IsString()
	readonly password: string;
}
