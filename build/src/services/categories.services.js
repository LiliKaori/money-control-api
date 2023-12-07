"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_entity_1 = require("../entities/category.entity");
const app_error_1 = require("../errors/app.error");
class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create({ title, color }) {
        const foundCategory = await this.categoriesRepository.findByTitle(title);
        if (foundCategory) {
            throw new app_error_1.AppError('Category already exists.', http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const category = new category_entity_1.Category({
            title,
            color,
        });
        const createdCategory = await this.categoriesRepository.create(category);
        return createdCategory;
    }
    async index() {
        const categories = await this.categoriesRepository.index();
        return categories;
    }
}
exports.CategoriesService = CategoriesService;
