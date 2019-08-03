import { Global, MiddlewareConsumer, Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompaniesMiddleware } from '../common/middleware/logger.middleware';

@Global()
@Module({
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})

export class CompanyModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(CompaniesMiddleware)
            .forRoutes(CompanyController);
    }
}
