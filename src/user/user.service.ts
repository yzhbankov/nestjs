import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';


@Injectable()
export class UserService {
    private readonly users: {[key: string]: User} = {};

    public async find(uid: string): Promise<User> {
        return new Promise((res: (value?: User) => void, rej: (reason?: any) => void) => {
            res(this.users[uid]);
        });
    }

    public async findAll(): Promise<User[]> {
        const users: User[] = Object.values(this.users);
        return new Promise((res: (value?: User[]) => void, rej: (reason?: any) => void) => {
            res(users);
        });
    }

    public create(user: User): void {
        this.users[user.uid] = user;
    }


    public update(partials: UpdateUserDto, uid: string): void {
        const user: User = this.users[uid];
        this.users[uid] = {...user, ...partials};
    }

    public delete(uid: string): void {
        delete this.users[uid];
    }
}
