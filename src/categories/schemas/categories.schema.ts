import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Categories extends Document {
    @Prop({ required: true })
    key: string;
    @Prop({ required: true })
    name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);