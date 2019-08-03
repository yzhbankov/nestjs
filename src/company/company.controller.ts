import { Controller, Get } from '@nestjs/common';

@Controller('company')
export class CompanyController {
    @Get()
    public getAll(): string {
        return 'Hello from company controller';
    }
}
