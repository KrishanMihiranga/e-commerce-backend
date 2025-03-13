import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dtos/stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }
  @Get()
  async getAllStocks() {
    return this.stockService.getAll();
  }

  @Post()
  async addNewProduct(@Body() product: StockDto) {
    return this.stockService.create(product);
  }

  @Delete(':slug')
  async deleteProduct(@Param('slug') slug: string) {
    return this.stockService.delete(slug);
  }
}
