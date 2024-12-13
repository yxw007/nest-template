import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const { NODE_ENV } = process.env;

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name, { timestamp: true });

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const { method, url } = request;
		const now = Date.now();

		this.logger.log(`Incoming Request: <=============================================`);
		this.logger.log(`Incoming Request: ${method} ${url}`);
		if (NODE_ENV === "development") {
			this.logger.log(`Request Body: ${JSON.stringify(request.body)}`);
			this.logger.log(`Request Query: ${JSON.stringify(request.query)}`);
		}

		return next
			.handle()
			.pipe(
				tap(() => {
					this.logger.log(`Outgoing Response: ${method} ${url} - ${Date.now() - now}ms`);
					this.logger.log(`Outgoing Response: =============================================>`);
				}),
			);
	}
}
