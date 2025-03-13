import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductColors, ProductColorsSchema } from './schemas/colors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductColors.name,
        schema: ProductColorsSchema,
      },
    ])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule { }
