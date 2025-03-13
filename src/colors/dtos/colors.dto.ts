import { IsString } from "class-validator";

export class ProductColorsDto {
    @IsString()
    key: string;
    @IsString()
    name: string;
    @IsString()
    hex: string;
}