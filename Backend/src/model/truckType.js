const mongodb = require('mongoose');
const truckTypeSchema = mongodb.Schema({
    TruckType: {
        type: String,
        required: true,
    },
    capicity: {
        type: String,
    },
    truckTypeImage: {
        type: String,
    }
}, { timestamps: true });
const TruckType = mongodb.model('truckType', truckTypeSchema);
module.exports = TruckType;