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
    const req = context.switchToRpc().getData();
    this.logger.log('before....', req);

    return next.handle().pipe(tap((data) => this.logger.log(data)));
  }
}
