import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConsoleLogger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new ConsoleLogger();
    logger.log(JSON.stringify(context.switchToHttp().getRequest().body));
    return next.handle().pipe(
      catchError((err) => {
        logger.log(err);
        return throwError(
          () =>
            new BadGatewayException('intercepted bad gateway', {
              cause: new Error(err),
            }),
        );
      }),
    );
  }
}
