import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter<TypeORMError> {
  private logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, { error: exception });

    console.error(exception);
    console.error(JSON.stringify(exception, null, 2));

    response.status(500).json({
      statusCode: 500,
      message: "Something went wrong!",
    });
  }
}
