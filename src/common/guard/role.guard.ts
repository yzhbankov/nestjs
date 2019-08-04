import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    public constructor(protected reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles: string[]  = this.reflector.get<'string'[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request: Request = context.switchToHttp().getRequest();
        const user: any = request['user'];

        const hasRole: boolean = user && user.roles && user.roles
            .some((role: string) => !!roles.find((item: string) => item === role));

        return hasRole;
    }

}
