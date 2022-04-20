const express = require('express');
const auth = require('../middleware/auth');
const convessationRoom = require('../model/convessationRoom');
const User = require('../model/user');
const router = express.Router();
router.use(express.json());
router.post('/roomdata', auth, async (req, res) => {
    try {

        const data = await convessationRoom.find({ $or: [{ userId: req.user._id, senderId: req.body.senderId }, { userId: req.body.senderId, senderId: req.user._id }] });

        if (data.length !== 0) {
            res.send({ data, status: true })
        } else {
            const ConvessationRoom = new convessationRoom({ userId: req.user._id, ...req.body });
            const data1 = await ConvessationRoom.save();
            
            res.send({ data: [data1], status: true })
        }

    } catch (e) {
        res.send(e.toString())
    }
})
router.get('/adminMessageList', auth, async (req, res) => {
    try {
        const data = await convessationRoom.find({ $or: [{ userId: req.user._id }] }).populate("senderId");
        // console.log("data", data)
        res.send({ data, status: true })
    } catch (e) {
        res.send(e.toString())
    }
})
router.get('/userMessageList', auth, async (req, res) => {
    try {
        const data = await convessationRoom.find({ $or: [{ senderId: req.user._id }] }).populate("userId");
        // console.log("data", data)
        res.send({ data, status: true })
    } catch (e) {
        res.send(e.toString())
    }
})
module.exports = router;