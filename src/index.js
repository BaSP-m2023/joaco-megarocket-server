// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
// const admins = require('./data/admins.json');
const adminRoute = require('./resources/admins');

const app = express();
const port = process.env.PORT || 4002;
const trainers = require('./resources/trainer');

app.use(cors());
app.use(express.json());
app.use('/resources/member', require('./resources/member'));

app.use('/admin', adminRoute);
app.use('/trainer', trainers);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
