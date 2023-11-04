import { Router } from 'express';

import { baseRoutes } from './base.route';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/categories', baseRoutes);
