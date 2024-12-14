import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	userId: number;

	@Column()
	userName: string;

	@Column()
	password: string;
}
