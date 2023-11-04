import express, { json } from 'express';

import { routes } from './routes';

const app = express();

app.use(json());
app.use(routes);

app.listen(3333, () => console.log('🚀 App is runnig at port 3333'));
