import { IsString } from "class-validator";

export class SubCategoryDto {
    @IsString()
    key: string;
    @IsString()
    name: string;
}