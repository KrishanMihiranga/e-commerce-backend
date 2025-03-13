import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './schemas/stock.schema';
import { Model } from 'mongoose';
import { StockDto } from './dtos/stock.dto';
import errors from 'src/config/errors.config';
import slugify from 'slugify';
import { ProductColors } from 'src/colors/schemas/colors.schema';
import { ProductSize } from 'src/size/schemas/size.schema';

@Injectable()
export class StockService {


    constructor(
        @InjectModel(Stock.name) private StockModel: Model<Stock>,
        @InjectModel(ProductColors.name) private ProductColorsModel: Model<ProductColors>,
        @InjectModel(ProductSize.name) private ProductSizesModel: Model<ProductSize>,
    ) { }
    async getAll() {
        const stocks = await this.StockModel.find().select('-_id');

        const stocksWithColors = await Promise.all(stocks.map(async (stock) => {
            const updatedImages = await Promise.all(stock.Images.map(async (image) => {
                const color = await this.ProductColorsModel.findOne({ key: image.colorKey }).exec();
                if (color) {
                    image.colorKey = color;
                }
                return image;
            }));

            return {
                ...stock.toObject(),
                Images: updatedImages,
            };
        }));

        return stocksWithColors;
    }


    async create(product: StockDto) {
        if (product.Images.length === 0) {
            throw new BadRequestException(errors.productImagesRequired);
        }
        if (!product.Price || product.Price <= 0) {
            throw new BadRequestException(errors.productPriceRequired);
        }
        if (!product.Sizes || product.Sizes.length === 0) {
            throw new BadRequestException(errors.productSizesRequired);
        }
        if (!product.Description || product.Description.trim() === '') {
            throw new BadRequestException(errors.productDescriptionRequired);
        }

        const colorKeys = product.Images.map(image => image.colorKey);
        const existingColors = await this.ProductColorsModel.find({ key: { $in: colorKeys } }).exec();
        const existingColorKeys = existingColors.map(color => color.key);
        const missingColorKeys = colorKeys.filter(colorKey => !existingColorKeys.includes(colorKey));
        if (missingColorKeys.length > 0) {
            throw new BadRequestException(errors.colorNotFound);
        }

        const sizes = product.Sizes.map(size => size);
        const existingSizes = await this.ProductSizesModel.find({ size: { $in: sizes } }).exec();
        const existingSizesKeys = existingSizes.map(size => size.size);
        const missingSizes = sizes.filter(sizeKey => !existingSizesKeys.includes(sizeKey));
        if (missingSizes.length > 0) {
            throw new BadRequestException(errors.sizeNotFound);
        }


        let baseSlug = slugify(product.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        while (await this.StockModel.exists({ slug })) {
            slug = `${baseSlug}-${count}`;
            count++;
        }

        const newProduct = new this.StockModel({
            ...product,
            slug,
        });

        return newProduct.save();
    }

    async delete(slug: string) {
        const result = await this.StockModel.deleteOne({ slug }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.ProductNotFound);
        }
        return { deleted: true };
    }


}
