import {
    Body, Controller, Delete, Get, Header, HttpCode, Next, NotFoundException, Param, Post, Put, Query,
    Req, Res, UnprocessableEntityException, UsePipes
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
import { ParseDatePipe } from '../common/pipe/parse-date.pipe';

@Controller('company')
export class CompanyController {
    public constructor(private readonly companyService: CompanyService) { }

    @Get('/')
    public async get(@Req() request: Request, @Res() response: Response, @Next() next: NextFunction): Promise<void> {
        const companies: Company[] = await this.companyService.findAll();
        response.json({ companies });
    }

    @Get('/:uid')
    @Header('Cache-Control', 'none')
    public async getOne(@Query('prop') prop: string, @Param('uid') uid: string): Promise<Company> {
        const company: Company = await this.companyService.find(uid);
        if (!company) {
            throw new NotFoundException('Company not found');
        }
        return company;
    }

    @Post('/')
    @HttpCode(202)
    @UsePipes(new ParseDatePipe())
    public async create(@Body() body: CreateCompanyDto): Promise<Company> {
        console.log('body');
        console.log(body);
        const companyExist: Company = await this.companyService.find(body.uid);
        if (companyExist) {
            throw new UnprocessableEntityException('The company with this uid already exist');
        }
        this.companyService.create(body);
        return this.companyService.find(body.uid);
    }

    @Put('/:uid')
    @HttpCode(202)
    public async update(@Param('uid') uid: string, @Body() body: UpdateCompanyDto): Promise<Company> {
        const companyExist: Company = await this.companyService.find(uid);
        if (!companyExist) {
            throw new NotFoundException('The company with this uid not found');
        }
        this.companyService.update(body, uid);
        return this.companyService.find(uid);
    }

    @Delete('/:uid')
    @HttpCode(204)
    public remove(@Param('uid') uid: string): {uid: string} {
        this.companyService.delete(uid);
        return { uid };
    }
}
