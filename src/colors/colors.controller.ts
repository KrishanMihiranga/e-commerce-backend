import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ProductColorsDto } from './dtos/colors.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) { }
  @Get()
  async getAllColors(): Promise<ProductColorsDto[]> {
    return this.colorsService.getAll();
  }

  @Post()
  async createNewColor(@Body() color: ProductColorsDto) {
    return this.colorsService.create(color);
  }

  @Delete(':key')
  async deleteCategory(@Param('key') key: string) {
    return this.colorsService.delete(key);
  }
}
