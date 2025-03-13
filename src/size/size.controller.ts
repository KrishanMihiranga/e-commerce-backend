import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { ProductSizeDto } from './dtos/size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) { }

  @Get()
  async getAllColors(): Promise<ProductSizeDto[]> {
    return this.sizeService.getAll();
  }

  @Post()
  async createNewSize(@Body() size: ProductSizeDto) {
    return this.sizeService.create(size);
  }

  @Delete(':size')
  async deleteSize(@Param('size') size: string) {
    return this.sizeService.delete(size);
  }

}
