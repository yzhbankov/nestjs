import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(22)
    @MaxLength(60)
    public readonly uid: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    public readonly createdAt: string;

    @IsString()
    @MinLength(22)
    @MaxLength(60)
    public readonly companyUid: string;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}
