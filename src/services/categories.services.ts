import { CategoriesRepository } from '../database/repositories/categories.repository';
import { Category } from '../entities/category.entity';

export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async create(): Promise<Category> {
        const category = new Category({
            title: 'Exemple Category',
            color: '#ff33bb',
        });

        const createdCategory =
            await this.categoriesRepository.create(category);

        return createdCategory;
    }
}
