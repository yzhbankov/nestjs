import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';


@Injectable()
export class ParseDatePipe implements PipeTransform<string, number> {
    public transform(value: any, metadata: ArgumentMetadata) {
        const newVal: any = {...value};
        newVal.createdAt = new Date(newVal.value);
        if (isNaN(newVal.createdAt.getTime())) {
            throw new BadRequestException('Validation failed');
        }
        return newVal;
    }
}
