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
        @InjectModel(SubCategories.name) private SubCategoriesModel: Model<SubCategories>
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
    async getProductBySlug(slug: string) {
        const stocks = await this.StockModel.find({ slug }).select('-_id');

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
        if (!product.productDetails?.length) {
            throw new BadRequestException(errors.productImagesRequired);
        }

        if (!product.productDetails.some(detail => detail.sizes?.length)) {
            throw new BadRequestException(errors.productSizesRequired);
        }

        if (!product.description?.trim()) {
            throw new BadRequestException(errors.productDescriptionRequired);
        }


        const colorKeys = product.productDetails.map(detail => detail.colorKey);
        const sizes = product.productDetails.flatMap(detail => detail.sizes.map(size => size.size));

        const [existingColors, existingSizes, existingCategory, existingSubCategory] = await Promise.all([
            this.ProductColorsModel.find({ key: { $in: colorKeys } }).exec(),
            this.ProductSizesModel.find({ size: { $in: sizes } }).exec(),
            this.CategoriesModel.findOne({ key: product.mainCategoryKey }).exec(),
            this.SubCategoriesModel.findOne({ key: product.subCategoryKey }).exec(),
        ]);


        const existingColorKeys = new Set(existingColors.map(color => color.key));
        if (colorKeys.some(key => !existingColorKeys.has(key))) {
            throw new BadRequestException(errors.colorNotFound);
        }


        const existingSizeValues = new Set(existingSizes.map(size => size.size));
        if (sizes.some(size => !existingSizeValues.has(size))) {
            throw new BadRequestException(errors.sizeNotFound);
        }

        if (!existingCategory) throw new BadRequestException(errors.categoryNotFound);
        if (!existingSubCategory) throw new BadRequestException(errors.categoryNotFound);


        const baseSlug = slugify(product.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        while (await this.StockModel.exists({ slug })) {
            slug = `${baseSlug}-${count}`;
            count++;
        }


        const session = await this.StockModel.startSession();
        session.startTransaction();
        try {
            const newProduct = new this.StockModel({
                ...product,
                slug,
                ProductDetails: product.productDetails
            });

            await newProduct.save({ session });


            await session.commitTransaction();
            session.endSession();

            return newProduct;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    async updateStock(slug: string, product: StockDto) {
        const existing = await this.StockModel.findOne({ slug });
        if (!existing) {
            throw new NotFoundException(errors.ProductNotFound);
        }

        if (!product.productDetails?.length) {
            throw new BadRequestException(errors.productImagesRequired);
        }
        if (!product.productDetails.some(detail => detail.sizes?.length)) {
            throw new BadRequestException(errors.productSizesRequired);
        }
        if (!product.description?.trim()) {
            throw new BadRequestException(errors.productDescriptionRequired);
        }

        const colorKeys = product.productDetails.map(detail => detail.colorKey);
        const sizes = product.productDetails.flatMap(detail => detail.sizes.map(size => size.size));

        const [existingColors, existingSizes, existingCategory, existingSubCategory] = await Promise.all([
            this.ProductColorsModel.find({ key: { $in: colorKeys } }).exec(),
            this.ProductSizesModel.find({ size: { $in: sizes } }).exec(),
            this.CategoriesModel.findOne({ key: product.mainCategoryKey }).exec(),
            this.SubCategoriesModel.findOne({ key: product.subCategoryKey }).exec(),
        ]);

        const missingColorKeys = colorKeys.filter(key => !existingColors.some(color => color.key === key));
        if (missingColorKeys.length) {
            throw new BadRequestException(errors.colorNotFound);
        }

        const missingSizes = sizes.filter(size => !existingSizes.some(existing => existing.size === size));
        if (missingSizes.length) {
            throw new BadRequestException(errors.sizeNotFound);
        }

        if (!existingCategory) {
            throw new BadRequestException(errors.categoryNotFound);
        }
        if (!existingSubCategory) {
            throw new BadRequestException(errors.categoryNotFound);
        }

        let baseSlug = slugify(product.name, { lower: true, strict: true });
        let newSlug = baseSlug;

        if (existing.slug !== newSlug) {
            let count = 1;
            while (await this.StockModel.exists({ slug: newSlug })) {
                newSlug = `${baseSlug}-${count}`;
                count++;
            }
        }

        const session = await this.StockModel.startSession();
        session.startTransaction();
        try {
            const updatedProduct = await this.StockModel.findOneAndUpdate(
                { slug },
                {
                    ...product,
                    slug: newSlug,
                    ProductDetails: product.productDetails.map(detail => ({ ...detail, }))
                },
                { new: true, session }
            ).select('-_id');
            if (!updatedProduct) {
                throw new NotFoundException(errors.ProductNotFound);
            }

            await session.commitTransaction();
            session.endSession();

            return updatedProduct;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }



    async delete(slug: string) {
        const result = await this.StockModel.deleteOne({ slug }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.ProductNotFound);
        }
        return { deleted: true };
    }


}
