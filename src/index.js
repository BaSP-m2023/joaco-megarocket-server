// use "import" to import libraries
import express from 'express';
import cors from 'cors';

const mongoose = require('mongoose');

const url = 'mongodb+srv://joaco-team:1q248tHUzroQSLTL@megarocket-databases.inpprte.mongodb.net/joaco-database';

mongoose.connect(url)
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected'))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e));

const app = express();
const port = process.env.PORT || 4002;
// eslint-disable-next-line import/no-unresolved
const router = require('./routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});
app.use('/api', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
