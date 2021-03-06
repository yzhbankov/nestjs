import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ApplicationModule } from './app.module';
import { globalLoggerMiddleware } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { CustomValidationPipe } from './common/pipe/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(ApplicationModule);
    app.use(globalLoggerMiddleware);
    app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalPipes(new CustomValidationPipe());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(3000);
}

bootstrap();
