import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/* 1. To ensure this filter catches exceptions of type PrismaClientKnownRequestError is added in catch decorator
2. BaseExceptionFilter class provides a default implementation for the catch method that returns an "Internal server error" response to the user. */

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { code } = exception;
    const { status, message } = errorMap[code] ?? {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };

    response.status(status).json({ statusCode: status, message });
  }
}

const errorMap: Record<
  string,
  { status: number; message: string } | undefined
> = {
  // <-- Map Prisma error codes to HTTP status codes and a generic error message
  P2000: { status: HttpStatus.BAD_REQUEST, message: 'Invalid data provided' }, // 400 Bad Request
  P2002: { status: HttpStatus.CONFLICT, message: 'Title already exists' }, // 409 Conflict
  P2025: { status: HttpStatus.NOT_FOUND, message: 'Article not found' }, // 404 Not Found
  // Add any other prisma error codes you want to handle...
};
