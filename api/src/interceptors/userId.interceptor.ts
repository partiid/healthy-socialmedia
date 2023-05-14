import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from '../interfaces/authenticatedRequest.interface';

/**
 * @description NOT USED ATM
 */
export class UserIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context
            .switchToHttp()
            .getRequest<AuthenticatedRequestInterface>();

        const userId = req.user.id_user;
        if (userId) {
            req.body.id_user = userId;
        }
        return next.handle();
    }
}
