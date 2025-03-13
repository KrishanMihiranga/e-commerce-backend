import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ versionKey: false })
export class ProductSize extends Document {
    @Prop({ required: true, unique: true })
    size: string;
    @Prop({ required: true })
    chest: number;
    @Prop({ required: true })
    length: number;
}

export const ProductSizeSchema = SchemaFactory.createForClass(ProductSize);