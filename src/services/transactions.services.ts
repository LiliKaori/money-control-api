import { StatusCodes } from 'http-status-codes';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { TransactionsRepository } from '../database/repositories/transactions.repository';
import {
    CreateTransactionDTO,
    GetDashboardDTO,
    IndexTransactionDTO,
} from '../dtos/transactions.dto';
import { Balance } from '../entities/balance.entity';
import { Transaction } from '../entities/transactions.entity';
import { AppError } from '../errors/app.error';

export class TransactionsService {
    constructor(
        private transactionsRepository: TransactionsRepository,
        private categoriesRepository: CategoriesRepository,
    ) {}

    async create({
        title,
        date,
        amount,
        type,
        categoryId,
    }: CreateTransactionDTO): Promise<Transaction> {
        const category = await this.categoriesRepository.findById(categoryId);

        if (!category) {
            throw new AppError(
                'Category does not exist.',
                StatusCodes.NOT_FOUND,
            );
        }

        const transaction = new Transaction({
            title,
            type,
            amount,
            category,
            date,
        });

        const createdTransaction =
            await this.transactionsRepository.create(transaction);

        return createdTransaction;
    }

    async index(filters: IndexTransactionDTO): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.index(filters);

        return transactions;
    }

    async getDashboard({ beginDate, endDate }: GetDashboardDTO) {
        let balance = await this.transactionsRepository.getBalance({
            beginDate,
            endDate,
        });

        if (!balance) {
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0,
            });
        }

        return balance;
    }
}
