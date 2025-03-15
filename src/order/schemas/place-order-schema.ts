import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false })
class qtyDetailsProps {
    @Prop({ required: true })
    color: string;
    @Prop({ required: true })
    size: string;
    @Prop({ required: true })
    qty: number;
}

class OrderProps {
    @Prop({ required: true })
    slug: string

    @Prop({ type: [qtyDetailsProps], required: true })
    qtyDetails: qtyDetailsProps[];
}

@Schema({ versionKey: false })
export class Order extends Document {

    @Prop({ required: true, unique: true })
    orderId: string;
    @Prop({ type: [OrderProps], required: true })
    order: OrderProps[];

}

export const OrderSchema = SchemaFactory.createForClass(Order);
