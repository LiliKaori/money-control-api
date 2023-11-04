import express, { json } from 'express';

const app = express();

app.use(json());

app.listen(3333, () => {
  console.log('🚀 App is runnig at port 3333');
});
