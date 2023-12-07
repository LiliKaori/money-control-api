import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { json } from 'express';

import { setupMongo } from './database';
import { errorHandler } from './middleware/error-handler.middleware';
import { routes } from './routes';

dotenv.config();

setupMongo().then(() => {
    const app = express();

    app.use(
        cors({
            origin: process.env.FRONT_URL,
        }),
    );
    app.use(json());
    app.use(routes);
    app.use(errorHandler);

    app.listen(3333, () => console.log('🚀 App is runnig at port 3333'));
});
