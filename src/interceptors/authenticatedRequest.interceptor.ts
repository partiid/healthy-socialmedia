import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Request} from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticatedRequest.interface';

export class AuthenticatedRequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

        const user = request.user;
        const AuthenticatedRequest: AuthenticatedRequest = Object.assign(request, {
            user: {id_user: request.user.id_user}
        })

        return next.handle().pipe(
            map((data) => {
                return {...data}
            }),
        );
    }


}