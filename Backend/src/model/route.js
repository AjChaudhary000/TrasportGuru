const mongodb = require('mongoose');
const RouteSchema = mongodb.Schema({
    from: {
        type: String
    },
    destination: {
        type: String
    },
    routeStop: {
        type: Array,
       
    },
    tarsportUserId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const Route = mongodb.model('route', RouteSchema);
module.exports = Route;