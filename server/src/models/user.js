const mongoose = require("mongoose");       // mongoose data models


// user schema
const userSchema = new mongoose.Schema({
    nameFirst: {
        type: String,
        required: true
    },
    nameLast: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true
    },
    imageURL: {
        type: String
    },
    password: {
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
            delete ret.password;
            return ret;
        }
    }
});



module.exports = mongoose.model("User", userSchema);