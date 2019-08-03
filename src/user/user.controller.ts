import {
    Body, Controller, Delete, Get, Header, HttpCode, Next, NotFoundException, Param, Post, Put, Query,
    Req, Res, UnprocessableEntityException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/models/company.model';

@Controller('user')
export class UserController {
    public constructor(
        private readonly userService: UserService,
        private readonly companyService: CompanyService
    ) { }

    @Get('/')
    public async get(@Req() request: Request, @Res() response: Response, @Next() next: NextFunction): Promise<void> {
        const users: User[] = await this.userService.findAll();
        response.json({ users });
    }

    @Get('/:uid')
    @Header('Cache-Control', 'none')
    public async getOne(@Query('prop') prop: string, @Param('uid') uid: string): Promise<User> {
        const user: User = await this.userService.find(uid);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post('/')
    @HttpCode(202)
    public async create(@Body() body: CreateUserDto): Promise<User> {
        const userExist: User = await this.userService.find(body.uid);
        const companyExist: Company = await this.companyService.find(body.companyUid);
        if (userExist) {
            throw new UnprocessableEntityException('The user with this uid already exist');
        }
        if (!companyExist) {
            throw new UnprocessableEntityException('The company for this user is not exist');
        }

        this.userService.create(body);
        return this.userService.find(body.uid);
    }

    @Put('/:uid')
    @HttpCode(202)
    public async update(@Param('uid') uid: string, @Body() body: UpdateUserDto): Promise<User> {
        const userExist: User = await this.userService.find(uid);
        if (!userExist) {
            throw new NotFoundException('The user with this uid not found');
        }
        this.userService.update(body, uid);
        return this.userService.find(uid);
    }

    @Delete('/:uid')
    @HttpCode(204)
    public remove(@Param('uid') uid: string): {uid: string} {
        this.userService.delete(uid);
        return { uid };
    }
}
