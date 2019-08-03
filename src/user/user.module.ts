import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersMiddleware } from '../common/middleware/logger.middleware';

@Module({
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(UsersMiddleware)
            .forRoutes(UserController);
    }
}
