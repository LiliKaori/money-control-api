import { Router } from 'express';

import { CategoriesController } from '../controllers/categories.controller';
import { createCategorySchema } from '../dtos/category.dto';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post(
    '/',
    validator({
        schema: createCategorySchema,
        type: ParamsType.BODY,
    }),
    controller.create,
);
