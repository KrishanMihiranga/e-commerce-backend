import { IsString } from "class-validator";

export class CategoryDto {
    @IsString()
    key: string;
    @IsString()
    name: string;
}