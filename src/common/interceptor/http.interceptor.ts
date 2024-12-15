import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor<T> implements NestInterceptor<T, any> {
	intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
		return next.handle().pipe(
			map(data => ({
				statusCode: context.switchToHttp().getResponse().statusCode,
				message: (data as any)?.message ?? 'Success',
				data,
			})),
		);
	}
}
