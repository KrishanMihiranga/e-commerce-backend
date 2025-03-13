import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dtos/stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }
  @Get()
  async getAllStocks() {
    return this.stockService.getAll();
  }

  @Get(':slug')
  async getProductBuySlug(@Param('slug') slug: string) {
    return this.stockService.getProductBySlug(slug);
  }

  @Post()
  async addNewProduct(@Body() product: StockDto) {
    return this.stockService.create(product);
  }

  @Put(':slug')
  async updateStock(@Param('slug') slug: string, @Body() product: StockDto) {
    return this.stockService.updateStock(slug, product);
  }

  @Delete(':slug')
  async deleteProduct(@Param('slug') slug: string) {
    return this.stockService.delete(slug);
  }

  @Patch('order/:slug')
  async placeOrder(@Param('slug') slug: string) {
    return this.stockService.placeOrder(slug);
  }
}
