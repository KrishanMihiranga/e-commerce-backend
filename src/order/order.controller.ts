import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dtos/place-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async health() {
      return 'healthy'
  }

  @Post()
  async placeOrder(@Body() order: PlaceOrderDto) {
    return this.orderService.placeOrder(order);
  }
}
