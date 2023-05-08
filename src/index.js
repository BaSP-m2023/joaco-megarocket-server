// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const trainersRoute = require('./resources/trainer');

const app = express();
const port = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.use('/trainer', trainersRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
