import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/place-order-schema';
import { Model } from 'mongoose';
import { PlaceOrderDto } from './dtos/place-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private OrderModel: Model<Order>,
    ) { }

    async placeOrder(order: PlaceOrderDto) {
        return await this.OrderModel.create({ orderId: Math.random().toString(), order: order.order })

    }

}
