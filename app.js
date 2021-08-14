const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoDB = require('./config/db');
const apiLimiter = require('./config/apiLimiter');

var app = express();

mongoDB.connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

app.set('trust proxy', 1);

app.use('/api', apiLimiter.apiRateLimit);
app.use('/api',  require('./routes/index'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.json({"message": err.message});
});

module.exports = app;
