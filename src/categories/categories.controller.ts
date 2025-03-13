import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos/categories.dto';
import { SubCategoryDto } from './dtos/sub-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('main')
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.getAll();
  }

  @Post('main')
  async createCategory(@Body() category: CategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Delete('main/:key')
  async deleteCategory(@Param('key') key: string) {
    return this.categoriesService.deleteByKey(key);
  }

  @Get('sub')
  async getAllSubCategories(): Promise<SubCategoryDto[]> {
    return this.categoriesService.getAllSubCategories();
  }


  @Post('sub')
  async createSubCategory(@Body() category: SubCategoryDto) {
    return this.categoriesService.createSubCategory(category);
  }

  @Delete('sub/:key')
  async deleteSubCategory(@Param('key') key: string) {
    return this.categoriesService.deleteSubCategoryByKey(key);
  }
}
