const express = require('express');                             // web framework for nodejs
const bcrypt = require('bcrypt');                               // generate random strings
// models
const User = require("../models/user");                         // model - user
// services
const messages = require("../services/messages");               // service - messages
const s3Bucket = require('../services/s3Bucket');               // service - storage
// middleware
const { generateToken } = require('../middlewares/auth');       // middleware - generate token
// router
const router = express.Router();


/////////////////////
//      login      //
/////////////////////

router.post(
    "/login",
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // checking user
            const userDetails = (await User.find({ email }))[0];
            if (!userDetails) {
                return res.status(401).json({
                    status: false,
                    info: messages.loggedInFailedUserNotFound()
                });
            };

            // checking user password
            const isPasswordMatching = await bcrypt.compare(password, userDetails.password);
            if (!isPasswordMatching) {
                return res.status(401).json({
                    status: false,
                    info: messages.loggedInFailedIncorrectCredentials()
                });
            };

            // generate access token
            const accessToken = await generateToken({
                id: userDetails.id,
                nameFirst: userDetails.nameFirst,
                nameLast: userDetails.nameLast,
                email: userDetails.email,
                phone: userDetails.phone,
                imageURL: userDetails.imageURL,
                createdAt: userDetails.createdAt
            });

            return res.status(200).json({
                status: true,
                info: messages.loggedInSuccessful(),
                data: { accessToken }
            });

        } catch (err) {
            console.log(err.stack);
            return res.status(500).json({
                status: false,
                info: err.message
            });
        }
    }
);


/////////////////////
//     sign up     //
/////////////////////

router.post(
    "/signup",
    s3Bucket.uploadFile.single('image'),
    async (req, res) => {
        try {
            const { nameFirst, nameLast, phone, email, password } = req.body;
            const imageURL = (req.file) ? req.file.location : null;

            const userDetails = (await User.find({ email }))[0];
            if (userDetails) {
                return res.status(401).json({
                    status: false,
                    info: messages.signedUpFailed()
                });
            };

            const hashedPassword = bcrypt.hashSync(password, 10);
            // create new user
            const user = new User({
                nameFirst: nameFirst,
                nameLast: nameLast,
                email: email,
                phone: phone,
                imageURL: imageURL,
                password: hashedPassword
            });
            await user.save();

            // generate access token
            const accessToken = await generateToken({
                id: user.id,
                nameFirst: nameFirst,
                nameLast: nameLast,
                email: email,
                phone: phone,
                imageURL: imageURL,
                createdAt: user.createdAt
            });

            return res.status(200).json({
                status: true,
                info: messages.signedUpSuccessful(),
                data: { accessToken }
            });

        } catch (err) {
            console.log(err.stack);
            return res.status(500).json({
                status: false,
                info: err.message
            });
        }
    }
);



module.exports = router;