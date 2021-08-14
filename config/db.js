const mongoose = require("mongoose");
require('dotenv').config({ path: "./.env" });
const log_formats = require('./log_format');
const logger = require('noogger').init(log_formats.DB_ERROR);
const error_format = require('./error_format');
const DB_LINK = process.env.MONGO_URI;

module.exports.connectDB = function dbConnect() {
    mongoose
        .connect(DB_LINK, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        .then( () => console.log("Database Connection Established."))
        .catch(err => {
        	logger.error(error_format.format("db.js", "connectDB()", err));
        });
}