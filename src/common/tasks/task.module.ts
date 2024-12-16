import { Module } from '@nestjs/common';
import { TaskService as TaskService } from './task.service';

@Module({
	providers: [TaskService],
})
export class TaskModule { }
