import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductSize } from './schemas/size.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import errors from 'src/config/errors.config';
import { ProductSizeDto } from './dtos/size.dto';

@Injectable()
export class SizeService {
    constructor(
        @InjectModel(ProductSize.name) private ProductSizeModel: Model<ProductSize>,
    ) { }


    async getAll() {
        return this.ProductSizeModel.find().exec();
    }
    async create(size: ProductSizeDto) {
        const isExist = await this.ProductSizeModel.findOne({ size: size.size }).exec();

        if (isExist) {
            throw new BadRequestException(errors.sizeAlreadyExists);
        }
        return this.ProductSizeModel.create(size);
    }

    async delete(size: string) {
        const result = await this.ProductSizeModel.deleteOne({ size: size }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.sizeNotFound);
        }
        return { deleted: true };
    }
}
