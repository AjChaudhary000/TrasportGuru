const mongodb = require('mongoose');
const TransportSchema = mongodb.Schema({

    capicity: {
        type: String,
        default: "0"
    },
    Truckdate: {
        type: Date,

    },
    truckPrice: {
        type: String
    },
    routeId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "route"
    },
    truckId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "truckDetails"
    },
    driverId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "driver"
    },
    tarsportUserId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const Transport = mongodb.model('transport', TransportSchema);
module.exports = Transport;