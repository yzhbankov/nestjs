import { Module } from '@nestjs/common';

import { CompanyModule } from './company/company.module';
import { AppController } from './app.controller';


@Module({
    imports: [CompanyModule],
    controllers: [AppController]
})

export class ApplicationModule {}
