import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './schemas/categories.schema';
import { Model } from 'mongoose';
import errors from 'src/config/errors.config';
import { CategoryDto } from './dtos/categories.dto';
import { SubCategoryDto } from './dtos/sub-categories.dto';
import { SubCategories } from './schemas/sub-categories.schema';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel(Categories.name) private CategoriesModel: Model<Categories>,
        @InjectModel(SubCategories.name) private SubCategoriesModel: Model<SubCategories>
    ) { }

    async getAll() {
        return this.CategoriesModel.find().exec();
    }

    async createCategory(category: CategoryDto) {
        const isExist = await this.CategoriesModel.findOne({ key: category.key }).exec();

        if (isExist) {
            throw new BadRequestException(errors.categoryAlreadyExists);
        }

        return this.CategoriesModel.create(category);
    }

    async deleteByKey(key: string) {
        const result = await this.CategoriesModel.deleteOne({ key }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.categoryNotFound);
        }

        return { deleted: true };
    }


    async createSubCategory(category: SubCategoryDto) {

        const isExist = await this.SubCategoriesModel.findOne({ key: category.key }).exec();

        if (isExist) {
            throw new BadRequestException(errors.categoryAlreadyExists);
        }

        return this.SubCategoriesModel.create(category);
    }
    
    async getAllSubCategories() {
        return this.SubCategoriesModel.find().exec();
    }

    async deleteSubCategoryByKey(key: string) {
        const result = await this.SubCategoriesModel.deleteOne({ key }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(errors.categoryNotFound);
        }
        return { deleted: true };
    }
    
}
