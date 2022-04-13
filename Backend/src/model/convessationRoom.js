
const mongoose = require('mongoose');
const convessationRoomSchama = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true });
const convessationRoom = mongoose.model('ConvessationRoom', convessationRoomSchama);
module.exports = convessationRoom;
