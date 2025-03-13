import { IsNumber, IsString } from "class-validator";

export class ProductSizeDto {
    @IsString()
    size: string;
    @IsNumber()
    chest: number;
    @IsNumber()
    length: number;
}