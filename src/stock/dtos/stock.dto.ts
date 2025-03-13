import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";


class UrlProps {
    @IsString()
    url: string;
    @IsBoolean()
    isCover: boolean;
}
class ProductDetailProps {
    @IsString()
    colorKey: string

    @IsArray()
    urls: UrlProps[];
   

    @IsArray()
    @IsString({ each: true })
    Sizes: string[];

    @IsNumber()
    Qty: number;

    @IsNumber()
    @Min(1)
    Price: number;
}

export class StockDto {
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDetailProps)
    ProductDetails: ProductDetailProps[];

    @IsString()
    mainCategoryKey: string;

    @IsString()
    subCategoryKey: string;

    @IsString()
    Description: string;

    @IsBoolean()
    IsKokoAvailable: boolean;
}
