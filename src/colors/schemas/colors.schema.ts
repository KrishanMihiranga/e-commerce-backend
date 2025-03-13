import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class ProductColors extends Document {
    @Prop({ required: true, unique: true })
    key: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    hex: string;
}

export const ProductColorsSchema = SchemaFactory.createForClass(ProductColors);