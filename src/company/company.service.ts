import { Injectable } from '@nestjs/common';

import { UpdateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';


@Injectable()
export class CompanyService {
    private readonly companies: {[key: string]: Company} = {};

    public async find(uid: string): Promise<Company> {
        return new Promise((res: (value?: Company) => void, rej: (reason?: any) => void) => {
            res(this.companies[uid]);
        });
    }

    public async findAll(): Promise<Company[]> {
        const companies: Company[] = Object.values(this.companies);
        return new Promise((res: (value?: Company[]) => void, rej: (reason?: any) => void) => {
            res(companies);
        });
    }

    public create(company: Company): void {
        this.companies[company.uid] = company;
    }


    public update(partials: UpdateCompanyDto, uid: string): void {
        const company: Company = this.companies[uid];
        this.companies[uid] = {...company, ...partials};
    }

    public delete(uid: string): void {
        delete this.companies[uid];
    }
}
