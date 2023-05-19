import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECT_URL)
// eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected'))
// eslint-disable-next-line no-console
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

try {
  app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`server listening on port: ${process.env.PORT}`);
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('There was an error starting the server: ', err);
}
