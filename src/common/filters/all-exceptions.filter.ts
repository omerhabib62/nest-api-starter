import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // --- NUCLEAR DEBUGGING START ---
    // This prints the raw object no matter what it is.
    console.log('====================================');
    console.log('🔥 CRASH DETECTED 🔥');
    console.log('Exception Type:', typeof exception);
    console.log('Raw Exception:', exception);
    console.log('====================================');
    // --- NUCLEAR DEBUGGING END ---

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    };

    response.status(httpStatus).json(responseBody);
  }
}