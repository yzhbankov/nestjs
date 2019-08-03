import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company/company.service';
import { Company } from './company/models/company.model';

@Controller('')
export class AppController {
    public constructor(private readonly companyService: CompanyService) { }
    @Get()
    public async hello(): Promise<Company[]> {
        return this.companyService.findAll();
    }
}
