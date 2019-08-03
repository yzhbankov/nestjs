import { Module } from '@nestjs/common';

import { CompanyModule } from './company/company.module';
import { CompanyService } from './company/company.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';


@Module({
    imports: [CompanyModule, UserModule],
    providers: [CompanyService],
    controllers: [AppController]
})

export class ApplicationModule {}
