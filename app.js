const path = require('path');
require('dotenv').config({
  path: path.resolve('./' + './.env'),
});
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./src/routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);

// const User = require('./src/models/user');
// (async function() {
//   await User.sync({ force: true });
// })();

module.exports = app;

