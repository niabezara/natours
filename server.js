const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtExecption', (err) => {
  console.log('uncaughtExecption');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connection success'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('server listens port ');
});

process.on('unhandledRejection', (err) => {
  console.log('UNDANDLEDREJECTION');
  server.close(() => {
    process.exit(1);
  });
});
