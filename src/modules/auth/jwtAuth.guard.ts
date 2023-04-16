import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly JwtService: JwtService) {
      
    }
    async canActivate(context) {
        console.log("JwtAuthGuard.canActivate"); 
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token);
        if (!token) {
          
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.JwtService.verifyAsync(
            token,
            {
              secret: process.env.JWT_SECRET
            }
          );
          console.log("Payload:", payload);
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          request['user'] = payload;
        } catch (err){
          
          throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

 }