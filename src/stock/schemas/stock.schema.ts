import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductColors } from "src/colors/schemas/colors.schema";
import { Type } from "class-transformer";

@Schema({ _id: false })
class UrlProps {
    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    isCover: boolean;
}

@Schema({ _id: false })
class SizeProps {
    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    qty: number;
}

@Schema({ _id: false })
class ProductDetailProps {
    @Prop({ type: Types.ObjectId, required: true })
    @Type(() => ProductColors)
    colorKey: Types.ObjectId | ProductColors;

    @Prop({ type: [UrlProps], required: true })
    urls: UrlProps[];

    @Prop({ type: [SizeProps], required: true })
    sizes: SizeProps[];

    @Prop({ required: true })
    price: number;
}

@Schema({ versionKey: false })
export class Stock extends Document {
    @Prop({ required: true, unique: true })
    slug: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [ProductDetailProps], required: true })
    ProductDetails: ProductDetailProps[];

    @Prop({ required: true })
    mainCategoryKey: string;

    @Prop({ required: true })
    subCategoryKey: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    isKokoAvailable: boolean;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
