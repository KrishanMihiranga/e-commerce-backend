import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dtos/place-order.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async health() {
    return 'healthy'
  }
  @UseGuards(AuthenticationGuard)
  @Post()
  async placeOrder(@Body() order: PlaceOrderDto, @Req() request: Request) {
    return this.orderService.placeOrder(order, request['userId']);
  }
}
