import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	constructor(@Inject('winston') private logger: Logger) { }

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		this.log(context.switchToHttp().getRequest());
		return next.handle();
	}

	private log(req: any) {
		const body = Object.assign({}, req.body);
		for (const key in body) {
			if (key.includes('password')) body[key] = '******';
		}

		const logObj = {
			data: {},
			from: req.ip,
		};

		if (req.user) logObj['user'] = req.user;

		if (Object.keys(body).length > 0) logObj.data['body'] = body;
		if (Object.keys(req.query).length > 0) logObj.data['query'] = req.query;
		if (Object.keys(req.params).length > 0) logObj.data['params'] = req.params;

		this.logger.http(`${String(req.method).toUpperCase()}-${req.route.path}`, logObj);
	}
}
