import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors('headers'));
app.use(express.json());
app.use('/api', router);

export default app;
