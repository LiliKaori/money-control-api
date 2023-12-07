import {
    GetDashboardDTO,
    GetFinancialEvolutionDTO,
    IndexTransactionDTO,
} from '../../dtos/transactions.dto';
import { Balance } from '../../entities/balance.entity';
import { Expense } from '../../entities/expense.entity';
import {
    Transaction,
    TransactionType,
} from '../../entities/transactions.entity';
import { TransactionModel } from '../schemas/transaction.schema';

export class TransactionsRepository {
    constructor(private model: typeof TransactionModel) {}

    async create({
        title,
        date,
        amount,
        type,
        category,
    }: Transaction): Promise<Transaction> {
        const createdTransaction = await this.model.create({
            title,
            date,
            amount,
            type,
            category,
        });

        return createdTransaction.toObject<Transaction>();
    }

    async index({
        title,
        categoryId,
        beginDate,
        endDate,
    }: IndexTransactionDTO): Promise<Transaction[]> {
        const whereParams: Record<string, unknown> = {
            ...(title && { title: { $regex: title, $options: 'i' } }),
            ...(categoryId && { 'category._id': categoryId }),
        };

        if (beginDate || endDate) {
            whereParams.date = {
                ...(beginDate && { $gte: beginDate }),
                ...(endDate && { $lte: endDate }),
            };
        }

        const transactions = await this.model.find(whereParams, undefined, {
            sort: {
                date: -1,
            },
        });

        const transactionsMap = transactions.map(item =>
            item.toObject<Transaction>(),
        );

        return transactionsMap;
    }

    async getBalance({
        beginDate,
        endDate,
    }: GetDashboardDTO): Promise<Balance> {
        const whereParams: Record<string, unknown> = { date: {} };

        if (beginDate || endDate) {
            whereParams.date = {
                ...(beginDate && { $gte: beginDate }),
                ...(endDate && { $lte: endDate }),
            };
        }

        const [result] = await this.model
            .aggregate<Balance>()
            .match(whereParams)
            .project({
                _id: 0,
                income: {
                    $cond: [
                        {
                            $eq: ['$type', 'income'],
                        },
                        '$amount',
                        0,
                    ],
                },
                expense: {
                    $cond: [
                        {
                            $eq: ['$type', 'expense'],
                        },
                        '$amount',
                        0,
                    ],
                },
            })
            .group({
                _id: null,
                incomes: {
                    $sum: '$income',
                },
                expenses: {
                    $sum: '$expense',
                },
            })
            .addFields({
                balance: {
                    $subtract: ['$incomes', '$expenses'],
                },
            });

        return result;
    }

    async getExpenses({
        beginDate,
        endDate,
    }: GetDashboardDTO): Promise<Expense[]> {
        const matchParams: Record<string, unknown> = {
            type: TransactionType.EXPENSE,
        };

        if (beginDate || endDate) {
            matchParams.date = {
                ...(beginDate && { $gte: beginDate }),
                ...(endDate && { $lte: endDate }),
            };
        }

        const result = await this.model
            .aggregate<Expense>()
            .match(matchParams)
            .group({
                _id: '$category._id',
                title: {
                    $first: '$category.title',
                },
                color: {
                    $first: '$category.color',
                },
                amount: {
                    $sum: '$amount',
                },
            });

        return result;
    }

    async getFinancialEvolution({
        year,
    }: GetFinancialEvolutionDTO): Promise<Balance[]> {
        console.log(year);
        const result = await this.model
            .aggregate<Balance>()
            .match({
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            })
            .project({
                _id: 0,
                income: {
                    $cond: [
                        {
                            $eq: ['$type', 'income'],
                        },
                        '$amount',
                        0,
                    ],
                },
                expense: {
                    $cond: [
                        {
                            $eq: ['$type', 'expense'],
                        },
                        '$amount',
                        0,
                    ],
                },
                year: {
                    $year: '$date',
                },
                month: {
                    $month: '$date',
                },
            })
            .group({
                _id: ['$year', '$month'],
                incomes: {
                    $sum: '$income',
                },
                expenses: {
                    $sum: '$expense',
                },
            })
            .addFields({
                balance: {
                    $subtract: ['$incomes', '$expenses'],
                },
            })
            .sort({
                _id: 1,
            });
        console.log(
            await this.model.aggregate<Balance>().match({
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-01-01`),
                },
            }),
        );

        console.log(result);

        return result;
    }
}
