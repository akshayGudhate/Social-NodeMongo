const multer = require('multer');               // multer file upload
const multerS3 = require('multer-s3');          // multer s3 storage
const { v4: uuidv4 } = require('uuid');         // v4 uuid generator
const aws = require('aws-sdk');                 // aws- sdk for s3
// env
require('dotenv').config();                     // environment vars
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// aws config update
aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: AWS_REGION
});

// init s3 instance
const s3 = new aws.S3();


//////////////////////
//   media upload   //
//////////////////////

const uploadFile = multer({
    storage: multerS3({
        s3: s3,                                     // aws instance
        bucket: AWS_BUCKET,                         // aws bucket name
        acl: 'public-read',                         // public access
        contentType: multerS3.AUTO_CONTENT_TYPE,    // sent object content type automatically
        key: (req, file, cb) => cb(null, uuidv4())  // file name
    }),
    limits: {
        fileSize: 50000000                          // file size limit in bytes
    }
});



module.exports = { uploadFile };