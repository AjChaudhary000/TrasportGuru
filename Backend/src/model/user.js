const mongodb = require('mongoose');
const jwt = require("jsonwebtoken");
const userSchema = mongodb.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    mobileno: {
        type: String
    },
    accountType: {
        type: String,
        enam: {
            values: ["User", "Admin", "Driver"],
        },
    },

    trasportAccount: [{
        trasportName: {
            type: String
        },
        trasportAddress: {
            type: String
        },
        trasportImage: {
            type: String
        },
        trasportmobile: {
            type: String
        },
    }]
}, { timestamps: true });
userSchema.methods.genrateToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, process.env.JSONTOKEN);
    return token;
}
const User = mongodb.model('user', userSchema);
module.exports = User;