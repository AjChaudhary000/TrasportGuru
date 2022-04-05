const mongodb = require('mongoose');
const otpSchema = mongodb.Schema({
    email: {
        type: String,
        required: true,    
    },
    otp: {
        type: String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' },
    },
}, { timestamps: true });
const OTP = mongodb.model('otp', otpSchema);
module.exports = OTP;