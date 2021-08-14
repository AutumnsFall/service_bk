const rateLimit = require('express-rate-limit');
const mongoStore = require('rate-limit-mongo');
require('dotenv').config({path: "./.env"});

module.exports.apiRateLimit = rateLimit({
    windowMs: parseInt(process.env.API_WINDOWMS)*60*1000, 
    max: parseInt(process.env.API_REQ_LIMIT),
    store: new mongoStore({
      uri: process.env.MONGO_URI
    }),
    message: {
      statue: 429,
      message: "Too many api requests made. Please try again later."
    }
});

module.exports.authRateLimit = rateLimit({
    windowMs: parseFloat(process.env.AUTH_WINDOWMS)*60*1000, 
    max: parseInt(process.env.AUTH_REQ_LIMIT),
    store: new mongoStore({
      uri: process.env.MONGO_URI
    }),
    message: {
      status: 429,
      message: "Too many login requests. Please try again later."
    }
});