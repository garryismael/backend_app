const path = require('path');
require('dotenv').config({
  path: path.resolve('./' + './.env'),
});
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

module.exports = app;

