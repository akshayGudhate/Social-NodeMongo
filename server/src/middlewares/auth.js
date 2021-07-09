const jwt = require('jsonwebtoken');                // jwt - authentication
// services
const messages = require("../services/messages");   // service - messages
// env
require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;      // env - access token


/////////////////////////
//    generate token   //
/////////////////////////

const generateToken = async (user) => {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '12h' });
};


/////////////////////////
//     authenticate    //
/////////////////////////

const authToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.status(400).json({
                status: false,
                info: messages.authFailedTokenNotAdded()
            });
        };
        // if token exist verify
        const user = jwt.verify(token, ACCESS_TOKEN);
        req.user = user;

        next();

    } catch (err) {
        console.log(err.stack);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                info: messages.authFailedTokenExpired()
            });
        };

        return res.status(500).json({
            status: false,
            info: err.message
        });
    }
};



module.exports = { generateToken, authToken };