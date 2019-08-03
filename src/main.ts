import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ApplicationModule } from './app.module';
import { globalLoggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(ApplicationModule);
    app.use(globalLoggerMiddleware);
    await app.listen(3000);
}

bootstrap();
