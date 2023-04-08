import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotAcceptableException } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();


        let prismaException = this.isPrismaException(exception);
        
        
        return response
            .status(status)
            .json({
                status: status,
                data: [],
                errors: [
                    {
                        message: 
                        typeof exception.getResponse() == 'object' ? prismaException === true ? this.formatPrismaException(exception) : exception.getResponse()['message'] : exception.message,
                        path: request.url,
                        method: request.method,
                        timestamp: new Date().toISOString(),
                    }
                ],




            });
    }

    formatPrismaException(exception: any) {
        return exception.getResponse()['meta']['target'] + ' must be unique!'; 
    }
    
    isPrismaException(exception: any) {
        return 'cause' in exception; 
    }

}
