import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateTransactionDTO } from '../dtos/transactions.dto';
import { TransactionsService } from '../services/transactions.services';

export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    create = async (
        req: Request<unknown, unknown, CreateTransactionDTO>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { title, amount, categoryId, date, type } = req.body;

            const result = await this.transactionsService.create({
                title,
                amount,
                categoryId,
                date,
                type,
            });

            return res.status(StatusCodes.CREATED).json(result);
        } catch (err) {
            next(err);
        }
    };
}
