import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { SubCategories, SubCategoriesSchema } from './schemas/sub-categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: CategoriesSchema,
      },
      {
        name: SubCategories.name,
        schema: SubCategoriesSchema,
      },
    ])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
