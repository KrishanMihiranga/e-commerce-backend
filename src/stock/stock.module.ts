import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schemas/stock.schema';
import { ProductColors, ProductColorsSchema } from 'src/colors/schemas/colors.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
      MongooseModule.forFeature([{ name: ProductColors.name, schema: ProductColorsSchema }]),
    ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
