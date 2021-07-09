const express = require("express");                 // web framework for nodejs
// models
const Article = require("../models/article");       // model - article
// services
const messages = require("../services/messages");   // service - messages
const s3Bucket = require('../services/s3Bucket');   // service - storage
// router
const router = express.Router();


/////////////////////
//   add article   //
/////////////////////

router.post(
    "/",
    s3Bucket.uploadFile.single('media'),
    async (req, res) => {
        try {
            const { title, description } = req.body;
            const mediaURL = (req.file) ? req.file.location : null;
            const userID = req.user.id;

            // create new article
            const article = new Article({
                title: title,
                description: description,
                mediaURL: mediaURL,
                userID: userID,
            });
            await article.save();

            return res.status(200).json({
                status: true,
                info: messages.articleCreated(),
                data: article
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
//   all article   //
/////////////////////

router.get(
    "/list",
    async (req, res) => {
        try {
            const userID = req.user.id;

            const articles = await Article.find({ userID }, { __v: false });
            if (!articles) {
                return res.status(500).json({
                    status: true,
                    info: messages.articleNotFound()
                });
            }

            return res.status(200).json({
                status: true,
                info: messages.articleList(),
                data: articles
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
//   get article   //
/////////////////////

router.get(
    "/:id",
    async (req, res) => {
        try {
            const articleID = req.params.id;
            const userID = req.user.id;

            const article = await Article.findOne({ _id: articleID, userID });
            if (!article) {
                return res.status(500).json({
                    status: true,
                    info: messages.articleNotFound()
                });
            }

            return res.status(200).json({
                status: true,
                info: messages.articleFetched(),
                data: article
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


//////////////////////
//  update article  //
//////////////////////

router.put(
    "/:id",
    s3Bucket.uploadFile.single('media'),
    async (req, res) => {
        try {
            const updateFields = {};
            const userID = req.user.id;
            const articleID = req.params.id;

            if (req.body.title) updateFields.title = req.body.title;
            if (req.file) updateFields.mediaURL = req.file.location;
            if (req.body.description) updateFields.description = req.body.description;

            const article = await Article.findByIdAndUpdate({ _id: articleID, userID }, updateFields, { returnOriginal: false });
            return res.status(200).json({
                status: true,
                info: messages.articleFetched(),
                data: article
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


//////////////////////
//  delete article  //
//////////////////////

router.delete(
    "/:id",
    async (req, res) => {
        try {
            const articleID = req.params.id;
            const userID = req.user.id;

            const article = await Article.findByIdAndRemove({ _id: articleID, userID }, { __v: false });
            if (!article) {
                return res.status(500).json({
                    status: true,
                    info: messages.articleNotFound()
                });
            }

            return res.status(200).json({
                status: true,
                info: messages.articleDeleted(),
                data: { id: article.id }
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