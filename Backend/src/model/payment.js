const mongodb = require('mongoose');
const paymentSchema = mongodb.Schema({

    from: {
        type: Object
    },
    destination: {
        type: Object
    },
    capicity: {
        type: String,

    },
    totalPayment: {
        type: String,

    },
    paymentHistory: [
        {
            payment: {
                type: String,
            },
            paymentDate: {
                type: Date,
                default: Date.now,
            }
        }],
    paymentStatus: {
        type: String
    },
    tarsportId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "transport"
    },
    userId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const Payment = mongodb.model('payment', paymentSchema);
module.exports = Payment;