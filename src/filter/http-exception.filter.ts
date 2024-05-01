import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse() as
            | string
            | { message: string; error: string; statusCode: number }; //여기 메시지 넘어옴

        if (typeof error === 'string') {
            response.status(status).json({
                success: false,
                error: error,
                path: request.url,
            });
        } else {
            response.status(status).json({
                success: false,
                ...error,
                path: request.url,
            });
        }
    }
}