import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AspectLogger implements NestInterceptor {
  private logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;
    this.logger.log({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle().pipe(tap((data) => this.logger.log(statusCode, data)));
  }
}
