// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import subscription from './resources/subscription';

// use "require" to import JSON files
const trainersRoute = require('./resources/trainer');

const adminRoute = require('./resources/admins');
const classRoute = require('./resources/class');

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());
const superadminRouter = require('./resources/super-admins');

app.use('/superadmin', superadminRouter);

app.use(cors());
app.use(express.json());
app.use('/resources/member', require('./resources/member'));

app.use('/admin', adminRoute);

app.use('/trainer', trainersRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/subscription', subscription);

app.use('/class', classRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

const activityRouter = require('./resources/activity');

app.use('/activity', activityRouter);
