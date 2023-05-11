// use "import" to import libraries
import express from 'express';
import cors from 'cors';

const mongoose = require('mongoose');

const url = 'mongodb+srv://joaco-team:1q248tHUzroQSLTL@megarocket-databases.inpprte.mongodb.net/';

mongoose.connect(url).then(() => console.log('MongoDB connected'));

const app = express();
const port = process.env.PORT || 4002;
const index = require('./routes/index');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Base page');
});
app.use('/index', index);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
