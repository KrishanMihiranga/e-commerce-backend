import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './schemas/stock.schema';
import { Model } from 'mongoose';
import { StockDto } from './dtos/stock.dto';
import errors from 'src/config/errors.config';
import slugify from 'slugify';
import { ProductColors } from 'src/colors/schemas/colors.schema';
import { ProductSize } from 'src/size/schemas/size.schema';
import { Categories } from 'src/categories/schemas/categories.schema';
import { SubCategories } from 'src/categories/schemas/sub-categories.schema';

@Injectable()
export class StockService {


    constructor(
        @InjectModel(Stock.name) private StockModel: Model<Stock>,
        @InjectModel(ProductColors.name) private ProductColorsModel: Model<ProductColors>,
        @InjectModel(ProductSize.name) private ProductSizesModel: Model<ProductSize>,
        @InjectModel(Categories.name) private CategoriesModel: Model<Categories>,
        @InjectModel(SubCategories.name) private SubCategoriesModel: Model<SubCategories>,
    ) { }
    async getAll() {
        const stocks = await this.StockModel.find().select('-_id');

        const stocksWithColors = await Promise.all(
            stocks.map(async (stock) => {
                const updatedProductDetails = await Promise.all(
                    stock.ProductDetails.map(async (detail) => {
                        const color = await this.ProductColorsModel.findOne({ key: detail.colorKey }).exec();
                        if (color) {
                            detail.colorKey = color;
                        }
                        return detail;
                    })
                );

                return {
                    ...stock.toObject(),
                    ProductDetails: updatedProductDetails,
                };
            })
        );

        return stocksWithColors;
    }

    async create(product: StockDto) {
        if (!product.ProductDetails?.length) {
            throw new BadRequestException(errors.productImagesRequired);
        }
        if (!product.ProductDetails.some(detail => detail.Sizes?.length)) {
            throw new BadRequestException(errors.productSizesRequired);
        }
        if (!product.Description?.trim()) {
            throw new BadRequestException(errors.productDescriptionRequired);
        }


        const colorKeys = product.ProductDetails.map(detail => detail.colorKey);
        const existingColors = await this.ProductColorsModel.find({ key: { $in: colorKeys } }).exec();
        const missingColorKeys = colorKeys.filter(colorKey => !existingColors.some(color => color.key === colorKey));
        if (missingColorKeys.length) {
            throw new BadRequestException(errors.colorNotFound);
        }


        const sizes = product.ProductDetails.flatMap(detail => detail.Sizes);
        const existingSizes = await this.ProductSizesModel.find({ size: { $in: sizes } }).exec();
        const missingSizes = sizes.filter(size => !existingSizes.some(existing => existing.size === size));
        if (missingSizes.length) {
            throw new BadRequestException(errors.sizeNotFound);
        }

        const category = product.mainCategoryKey;
        const existingCategory = await this.CategoriesModel.findOne({ key: category }).exec();

        if (!existingCategory) {
            throw new BadRequestException(errors.categoryNotFound);
        }
        const subCategory = product.subCategoryKey;
        const existingSubCategory = await this.SubCategoriesModel.findOne({ key: subCategory }).exec();

        if (!existingSubCategory) {
            throw new BadRequestException(errors.categoryNotFound);
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
