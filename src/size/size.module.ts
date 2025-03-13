import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSize, ProductSizeSchema } from './schemas/size.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProductSize.name, schema: ProductSizeSchema, },
  ])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule { }
