import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";

class SizeProps {
    @IsString()
    size: string;
    @IsNumber()
    qty: number;
}

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
    @ValidateNested({ each: true })
    @Type(() => SizeProps)
    sizes: SizeProps[];

    // @IsNumber()
    // Qty: number;

    @IsNumber()
    @Min(1)
    price: number;
}

export class StockDto {
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDetailProps)
    productDetails: ProductDetailProps[];

    @IsString()
    mainCategoryKey: string;

    @IsString()
    subCategoryKey: string;

    @IsString()
    description: string;

    @IsBoolean()
    isKokoAvailable: boolean;
}
