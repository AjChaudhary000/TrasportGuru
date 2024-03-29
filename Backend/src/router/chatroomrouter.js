const express = require("express");
const auth = require("../middleware/auth");
const ChatRoom = require("../model/chatmodel");
const router = express.Router();
router.use(express.json());
router.post("/chat", auth, async (req, res) => {
    try {
        const io = req.app.get("io");
        const ConvessationRoom = new ChatRoom({
            userId: req.user._id,
            ...req.body,
        });
        const data = await ConvessationRoom.save();
        io.to(req.body.convessationId).emit("onSendMesssage", data);
        res.send({ data, status: true });
    } catch (e) {
        res.send(e.toString());
    }
});
router.post("/chatroom", auth, async (req, res) => {
    try {
        const data = await ChatRoom.find({
            convessationId: req.body.convessationId,
        });

        res.send({ data, status: true });
    } catch (e) {
        res.send(e.toString());
    }
});
router.post("/messageBadge", auth, async (req, res) => {
    try {
        const data = await ChatRoom.find({
            convessationId: req.body.convessationId,
            status: false,
            senderId: req.user._id,
        });
        console.log(data);
        res.send({ data, status: true });
    } catch (e) {
        res.send(e.toString());
    }
});
router.post("/clearMessageBadge", auth, async (req, res) => {
    try {
        await ChatRoom.updateMany(
            {
                convessationId: req.body.convessationId,
                status: false,
                senderId: req.user._id,
            },
            { status: true }
        );
        const data = await ChatRoom.find({
            convessationId: req.body.convessationId,
            status: false,
            senderId: req.user._id,
        });
        res.send({ data, status: true });
    } catch (e) {
        res.send(e.toString());
    }
});
module.exports = router;
