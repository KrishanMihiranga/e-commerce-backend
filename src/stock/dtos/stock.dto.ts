import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


class ImagesProps {
    @IsString()
    colorKey:string

    @IsString()
    url: string;

    @IsBoolean()
    isCover: boolean;
}

export class StockDto {
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImagesProps)
    Images: ImagesProps[];

    @IsString()
    mainCategoryKey: string;

    @IsString()
    subCategoryKey: string;

    @IsNumber()
    Price: number;

    @IsArray()
    @IsString({ each: true })
    Sizes: string[];

    @IsNumber()
    Qty: number;

    @IsString()
    Description: string;

    @IsBoolean()
    IsKokoAvailable: boolean;
}
