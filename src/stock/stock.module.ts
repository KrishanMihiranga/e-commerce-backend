import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schemas/stock.schema';
import { ProductColors, ProductColorsSchema } from 'src/colors/schemas/colors.schema';
import { ProductSize, ProductSizeSchema } from 'src/size/schemas/size.schema';
import { Categories, CategoriesSchema } from 'src/categories/schemas/categories.schema';
import { SubCategories, SubCategoriesSchema } from 'src/categories/schemas/sub-categories.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
      MongooseModule.forFeature([{ name: ProductColors.name, schema: ProductColorsSchema }]),
      MongooseModule.forFeature([{ name: ProductSize.name, schema: ProductSizeSchema }]),
      MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesSchema }]),
      MongooseModule.forFeature([{ name: SubCategories.name, schema: SubCategoriesSchema }]),
    ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
