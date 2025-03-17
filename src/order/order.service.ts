import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/place-order-schema';
import { Model, Types } from 'mongoose';
import { PlaceOrderDto } from './dtos/place-order.dto';
import { Stock } from 'src/stock/schemas/stock.schema';
import errors from 'src/config/errors.config';
import { nanoid } from 'nanoid';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private OrderModel: Model<Order>,
        @InjectModel(Stock.name) private StockModel: Model<Stock>,
    ) { }

    async placeOrder(order: PlaceOrderDto, userId: string) {
    
        const session = await this.StockModel.startSession();
        session.startTransaction();

        try {

            for (const item of order.order) {
                const stockItem = await this.StockModel.findOne({ slug: item.slug }).session(session);

                if (!stockItem) {
                    throw new NotFoundException(errors.ProductNotFound);
                }

                for (const qtyDetail of item.qtyDetails) {
                    const colorDetail = stockItem.ProductDetails.find(
                        (detail: any) => detail.colorKey === qtyDetail.color
                    );

                    if (!colorDetail) {
                        throw new NotFoundException(errors.colorNotFound);
                    }


                    for (const size of qtyDetail.sizes) {

                        const matchingSize = colorDetail.sizes.find(detail => detail.size === size.size);

                        if (!matchingSize) {
                            throw new NotFoundException(errors.sizeNotFound);
                        }

                        if (matchingSize.qty < size.qty) {
                            throw new BadRequestException(errors.NotEnoughStockAvailable);
                        }
                    }
                }
            }


            for (const item of order.order) {
                const stockItem = await this.StockModel.findOne({ slug: item.slug }).session(session);

                for (const productDetail of item.qtyDetails) {
                    const colorDetail = stockItem?.ProductDetails.find(
                        (detail: any) => detail.colorKey === productDetail.color
                    );

                    console.log('product details ', productDetail);

                    if (colorDetail) {
                        for (const sizeDetail of productDetail.sizes) {
                            console.log('Requested size and qty: ', sizeDetail);

                            const availableSize = colorDetail.sizes.find(
                                (detail: any) => detail.size === sizeDetail.size
                            );

                            if (availableSize) {
                                console.log('Available size and qty: ', availableSize);


                                if (availableSize.qty >= sizeDetail.qty) {
                                    console.log(`Sufficient stock for size ${sizeDetail.size}.`);

                                    availableSize.qty -= sizeDetail.qty;
                                    console.log(`Updated available qty for ${sizeDetail.size}: ${availableSize.qty}`);
                                } else {
                                    throw new BadRequestException(
                                        `Not enough stock for size ${sizeDetail.size}. Available: ${availableSize.qty}, Requested: ${sizeDetail.qty}`
                                    );
                                }
                            } else {
                                throw new NotFoundException(`Size ${sizeDetail.size} not found in color ${productDetail.color}`);
                            }
                        }
                    } else {
                        throw new NotFoundException(`Color ${productDetail.color} not found in stock`);
                    }
                }

                await stockItem?.save({ session });
            }


            const newOrder = new this.OrderModel({
                orderId: nanoid(8),
                order: order.order,
                userId: userId
            });

            await newOrder.save({ session });


            await session.commitTransaction();
            session.endSession();

            return { message: "Order placed successfully", orderId: newOrder.orderId };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new HttpException(error, 400);
        }
    }

}
