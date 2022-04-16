const mongodb = require('mongoose');
const TrackingSchema = mongodb.Schema({

    tarsportId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "transport"
    },
    paymentid: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "payment"
    },
    userId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const Tracking = mongodb.model('tracking', TrackingSchema);
module.exports = Tracking;