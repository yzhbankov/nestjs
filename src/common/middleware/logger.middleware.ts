import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


export function globalLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    console.log(`Response status code: ${res.statusCode}. Request method: ${req.method}`);
    next();
}

@Injectable()
export class UsersMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction): void {
        console.log(`Users path: ${req.path}`);
        next();
    }
}

@Injectable()
export class CompaniesMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction): void {
        console.log(`Companies path: ${req.path}`);
        next();
    }
}
