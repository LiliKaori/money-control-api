"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesFactory = void 0;
const categories_repository_1 = require("../database/repositories/categories.repository");
const category_schema_1 = require("../database/schemas/category.schema");
const categories_services_1 = require("../services/categories.services");
class CategoriesFactory {
    static getServiceInstance() {
        if (this.categoriesService) {
            return this.categoriesService;
        }
        const repository = new categories_repository_1.CategoriesRepository(category_schema_1.CategoryModel);
        const service = new categories_services_1.CategoriesService(repository);
        this.categoriesService = service;
        return service;
    }
}
exports.CategoriesFactory = CategoriesFactory;
