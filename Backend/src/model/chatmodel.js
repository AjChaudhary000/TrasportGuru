
const mongoose = require('mongoose');
const chatRoomSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    convessationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConvessationRoom',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;