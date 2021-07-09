const mongoose = require("mongoose");       // mongoose data models


// article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mediaURL: {
        type: String
    },
    userID: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toObject: {
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});



module.exports = mongoose.model("Article", articleSchema);