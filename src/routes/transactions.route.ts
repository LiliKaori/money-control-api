import { Router } from 'express';

import { TransactionsController } from '../controllers/transactions.controller';
import { createTransactionSchema } from '../dtos/transactions.dto';
import { TransactionsFactory } from '../factories/transactions.factory';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const transactionsRoutes = Router();

const controller = new TransactionsController(
    TransactionsFactory.getServiceInstance(),
);

transactionsRoutes.get('/', controller.index);

transactionsRoutes.post(
    '/',
    validator({
        schema: createTransactionSchema,
        type: ParamsType.BODY,
    }),
    controller.create,
);
