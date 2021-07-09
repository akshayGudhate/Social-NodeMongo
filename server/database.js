const mongoose = require("mongoose");               // mongoose data models

// env
require('dotenv').config();                         // environment variables
const DATABASE_URL = process.env.DATABASE_URL;


// init database connection
const initDatabaseConnection = async () => {
    await mongoose.connect(
        DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log("Connected to database!")
}



module.exports = initDatabaseConnection;