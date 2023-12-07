"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsFactory = void 0;
const categories_repository_1 = require("../database/repositories/categories.repository");
const transactions_repository_1 = require("../database/repositories/transactions.repository");
const category_schema_1 = require("../database/schemas/category.schema");
const transaction_schema_1 = require("../database/schemas/transaction.schema");
const transactions_services_1 = require("../services/transactions.services");
class TransactionsFactory {
    static getServiceInstance() {
        if (this.transactionsService) {
            return this.transactionsService;
        }
        const repository = new transactions_repository_1.TransactionsRepository(transaction_schema_1.TransactionModel);
        const categoriesRepository = new categories_repository_1.CategoriesRepository(category_schema_1.CategoryModel);
        const service = new transactions_services_1.TransactionsService(repository, categoriesRepository);
        this.transactionsService = service;
        return service;
    }
}
exports.TransactionsFactory = TransactionsFactory;
