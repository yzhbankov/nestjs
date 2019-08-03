import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, ValidationError } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object: any = plainToClass(metatype, value);
        const errors: any[] = await validate(object);
        if (errors.length > 0) {
            const message: string = errors.map(error => JSON.stringify(error)).join('');
            throw new BadRequestException(`Validation error. ${message}`);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
