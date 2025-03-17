import { IsString, IsNumber, IsArray, ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";


class SizeProps {
    @IsString()
    size: string;
    @IsNumber()
    @Min(1)
    qty: number;
}

class qtyDetailsProps {
    @IsString()
    color: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SizeProps)
    sizes: SizeProps[];
}

export class OrderProps {
    @IsString()
    slug: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => qtyDetailsProps)
    qtyDetails: qtyDetailsProps[];
}

export class PlaceOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProps)
    order: OrderProps[]
}
