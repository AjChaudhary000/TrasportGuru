const express = require('express');
const auth = require('../middleware/auth');
const ChatRoom = require('../model/chatmodel');
const router = express.Router();
router.use(express.json());
router.post('/chat', auth, async (req, res) => {
    try {
        const ConvessationRoom = new ChatRoom({ userId: req.user._id, ...req.body });
        const data = await ConvessationRoom.save();
        res.send(data)
    } catch (e) {
        res.send(e.toString())
    }
})
router.post('/chatroom', auth, async (req, res) => {
    try {
        const data = await ChatRoom.find({ ...req.body });
        // console.log("data", data)
        res.send(data)
    } catch (e) {
        res.send(e.toString())
    }
})
module.exports = router;