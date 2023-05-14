import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';


/**
 * @description Check if user can perform action based on the token he provided - if the id user in token doesn't match dont allow him to perform action
 */
@Injectable()
export class AllowedActionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestBody = request.body;
   

    //check if body contains id_user field and if it is equal to the id_user in the request
    if (requestBody.id_user && requestBody.id_user !== request.user.id_user) {
        throw new UnauthorizedException("You are not allowed to perform this action"); 
    } else {
        return true; 
    }




    
  }



}