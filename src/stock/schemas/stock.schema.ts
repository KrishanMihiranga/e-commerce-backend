import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ProductColors } from "src/colors/schemas/colors.schema";

@Schema()
class ImagesProps {
    @Prop({ required: true, type: Object })
    colorKey: string | ProductColors;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    isCover: boolean;
}

@Schema({ versionKey: false })
export class Stock extends Document {
    @Prop({ required: true, unique: true })
    slug: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [ImagesProps], required: true })
    Images: ImagesProps[];

    @Prop({ required: true })
    mainCategoryKey: string;

    @Prop({ required: true })
    subCategoryKey: string;

    @Prop({ required: true })
    Price: number;

    @Prop({ type: [String], required: true })
    Sizes: string[];

    @Prop({ required: true })
    Qty: number;

    @Prop({ required: true })
    Description: string;

    @Prop({ required: true })
    IsKokoAvailable: boolean;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
