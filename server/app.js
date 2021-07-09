const express = require("express");                 // express server base app
const cors = require('cors');                       // handle cors
const helmet = require('helmet');                   // set headers for better security
const compression = require('compression');         // compressed assets
// models
const initDBConnection = require("./database");     // models - database methods
// env
require('dotenv').config();                         // environment variables
const PORT = process.env.PORT;


/////////////////////////
//         app         //
/////////////////////////

const app = express();


/////////////////////////
//   security headers  //
/////////////////////////

app.use(helmet());


/////////////////////////
//     compression     //
/////////////////////////

app.use(compression());


/////////////////////////
//        cors         //
/////////////////////////

app.use(cors());


/////////////////////////
//     body parser     //
/////////////////////////

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/////////////////////////
//     api routes      //
/////////////////////////

app.use('/api', require('./src/routes/routes'));


/////////////////////////
//   starting server   //
/////////////////////////

(async () => {
    try {
        // connect database
        await initDBConnection();

        // start the app
        return app.listen(PORT, () => {
            console.log(`Your server is running at: http://localhost:${PORT}`);
        });

    } catch (err) {
        console.log(err, err.stack);
    }
})();