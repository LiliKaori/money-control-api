import * as dotenv from 'dotenv';
import express, { json } from 'express';

import { setupMongo } from './database';
import { routes } from './routes';

dotenv.config();

setupMongo().then(() => {
    const app = express();

    app.use(json());
    app.use(routes);

    app.listen(3333, () => console.log('🚀 App is runnig at port 3333'));
});
