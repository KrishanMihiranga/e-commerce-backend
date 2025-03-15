import { IsString, IsNumber, IsArray, ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";


class qtyDetailsProps {
    @IsString()
    color: string;

    @IsNumber()
    @Min(1)
    qty: number;

    @IsString()
    size: string;
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
