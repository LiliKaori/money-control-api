import { Category } from '../../entities/category.entity';
import { CategoryModel } from '../schemas/category.schema';

export class CategoriesRepository {
    constructor(private model: typeof CategoryModel) {}

    async create({ title, color }: Category): Promise<Category> {
        const createdCategory = await this.model.create({ title, color });

        return createdCategory.toObject<Category>();
    }

    async findByTitle(title: string): Promise<Category | undefined> {
        const category = await this.model.findOne({ title });

        return category?.toObject<Category>();
    }

    async index(): Promise<Category[]> {
        const categories = await this.model.find();

        const categoriesMap = categories.map(item => item.toObject<Category>());

        return categoriesMap;
    }
}
