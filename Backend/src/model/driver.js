const mongodb = require("mongoose");
const DriverSchema = mongodb.Schema(
    {
        driverName: {
            type: String,
        },
        driverImage: {
            type: String,
        },
        driverEmail: {
            type: String,
            unique: true,
        },
        driverMobileNo: {
            type: String,
            unique: true,
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
const Driver = mongodb.model("driver", DriverSchema);
module.exports = Driver;
