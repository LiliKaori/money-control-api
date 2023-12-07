"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
class CategoriesRepository {
    constructor(model) {
        this.model = model;
    }
    async create({ title, color }) {
        const createdCategory = await this.model.create({ title, color });
        return createdCategory.toObject();
    }
    async findByTitle(title) {
        const category = await this.model.findOne({ title });
        return category?.toObject();
    }
    async findById(id) {
        const category = await this.model.findById(id);
        return category?.toObject();
    }
    async index() {
        const categories = await this.model.find();
        const categoriesMap = categories.map(item => item.toObject());
        return categoriesMap;
    }
}
exports.CategoriesRepository = CategoriesRepository;
