const mongodb = require("mongoose");
const RouteSchema = mongodb.Schema(
    {
        from: {
            type: Object,
        },
        destination: {
            type: Object,
        },
        routeStop: {
            type: Array,
        },
        tarsportUserId: {
            type: mongodb.Schema.Types.ObjectId,
            ref: "user",
        },
        deleteData: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
const Route = mongodb.model("route", RouteSchema);
module.exports = Route;
