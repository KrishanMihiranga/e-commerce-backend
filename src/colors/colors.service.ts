import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductColors } from './schemas/colors.schema';
import { Model } from 'mongoose';
import { ProductColorsDto } from './dtos/colors.dto';
import errors from 'src/config/errors.config';

@Injectable()
export class ColorsService {
    constructor(
        @InjectModel(ProductColors.name) private ProductColorsModel: Model<ProductColors>,
    ) { }

    async getAll() {
        return this.ProductColorsModel.find().exec();
    }
    async create(color: ProductColorsDto) {
        const isExist = await this.ProductColorsModel.findOne({ key: color.key }).exec();

        if (isExist) {
            throw new BadRequestException(errors.colorAlreadyExists);
        }
        return this.ProductColorsModel.create(color);
    }
    async delete(key: string) {
        const result = await this.ProductColorsModel.deleteOne({ key }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.colorNotFound);
        }
        return { deleted: true };
    }

}
