import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @MinLength(22)
    @MaxLength(60)
    public readonly uid: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsDate()
    public readonly createdAt: Date;

    @IsString()
    @MaxLength(60)
    public readonly customInfo: string;
}

export class UpdateCompanyDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @MaxLength(60)
    public readonly customInfo: string;
}
