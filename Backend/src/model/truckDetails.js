const mongodb = require('mongoose');
const truckDetailsSchema = mongodb.Schema({
    truckName: {
        type: String,
        required: true,
    },
    truckModelName: {
        type: String,
        required: true
    },
    truckRegistartionNo: {
        type: String,
        require: true
    },
    truckImage: {
        type: String
    },
    truckCapicity: {
        type: String
    },
   
    truckTypeId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "truckType"
    },
    tarsportUserId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const TruckDetails = mongodb.model('truckDetails', truckDetailsSchema);
module.exports = TruckDetails;