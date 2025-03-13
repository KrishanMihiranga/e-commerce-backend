import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class SubCategories extends Document {
    @Prop({ required: true, unique: true })
    key: string;
    @Prop({ required: true })
    name: string;
}

export const SubCategoriesSchema = SchemaFactory.createForClass(SubCategories);