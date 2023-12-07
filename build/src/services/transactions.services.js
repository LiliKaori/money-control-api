"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const balance_entity_1 = require("../entities/balance.entity");
const transactions_entity_1 = require("../entities/transactions.entity");
const app_error_1 = require("../errors/app.error");
class TransactionsService {
    constructor(transactionsRepository, categoriesRepository) {
        this.transactionsRepository = transactionsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async create({ title, date, amount, type, categoryId, }) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category) {
            throw new app_error_1.AppError('Category does not exist.', http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const transaction = new transactions_entity_1.Transaction({
            title,
            type,
            amount,
            category,
            date,
        });
        const createdTransaction = await this.transactionsRepository.create(transaction);
        return createdTransaction;
    }
    async index(filters) {
        const transactions = await this.transactionsRepository.index(filters);
        return transactions;
    }
    async getDashboard({ beginDate, endDate, }) {
        let [balance, expenses] = await Promise.all([
            this.transactionsRepository.getBalance({
                beginDate,
                endDate,
            }),
            this.transactionsRepository.getExpenses({
                beginDate,
                endDate,
            }),
        ]);
        if (!balance) {
            balance = new balance_entity_1.Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0,
            });
        }
        return { balance, expenses };
    }
    async getFinancialEvolution({ year, }) {
        const getFinancialEvolution = await this.transactionsRepository.getFinancialEvolution({ year });
        return getFinancialEvolution;
    }
}
exports.TransactionsService = TransactionsService;
