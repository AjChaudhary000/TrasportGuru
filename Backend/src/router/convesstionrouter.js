const express = require("express");
const auth = require("../middleware/auth");
const ChatRoom = require("../model/chatmodel");
const convessationRoom = require("../model/convessationRoom");
const User = require("../model/user");
const router = express.Router();
router.use(express.json());
router.post("/roomdata", auth, async (req, res) => {
    try {
        const data = await convessationRoom.find({
            $or: [
                { userId: req.user._id, senderId: req.body.senderId },
                { userId: req.body.senderId, senderId: req.user._id },
            ],
        });

        if (data.length !== 0) {
            res.send({ data, status: true });
        } else {
            const ConvessationRoom = new convessationRoom({
                userId: req.user._id,
                ...req.body,
            });
            const data1 = await ConvessationRoom.save();

            res.send({ data: [data1], status: true });
        }
    } catch (e) {
        res.send(e.toString());
    }
});
router.get("/adminMessageList", auth, (req, res) => {
    let List = [];
    convessationRoom
        .find({ $or: [{ userId: req.user._id }] })
        .populate("senderId")
        .sort({ updatedAt: -1 })
        .then(async (data) => {
            const listPromise = [];
            data.forEach((item) => {
                listPromise.push(
                    ChatRoom.find({
                        convessationId: item._id,
                        status: false,
                        senderId: req.user._id,
                    }).then((item2) => {
                        return ChatRoom.find({
                            convessationId: item._id,

                        }).then((item3) => {
                            return { ...item._doc, messageCount: item2.length, lastMessage: item3[item3.length - 1] };
                        })
                    })
                );
            });

            await Promise.all(listPromise).then((data1) => {
                res.send({ data: data1, status: true });
            });


        });
});
router.get("/userMessageList", auth, (req, res) => {
    const List = [];
    convessationRoom
        .find({ $or: [{ senderId: req.user._id }] })
        .populate("userId")
        .sort({ updatedAt: -1 })
        .then(async (data) => {
            const listPromise = [];
            data.forEach((item) => {
                listPromise.push(
                    ChatRoom.find({
                        convessationId: item._id,
                        status: false,
                        senderId: req.user._id,
                    }).then((item2) => {
                        return ChatRoom.find({
                            convessationId: item._id,
                        }).then((item3) => {
                            return { ...item._doc, messageCount: item2.length, lastMessage: item3[item3.length - 1] };
                        })
                    })
                );
            });
            await Promise.all(listPromise).then((data1) => {
                res.send({ data: data1, status: true });
            });

        });
});
router.post("/sortMessageList", auth, async (req, res) => {
    try {
        const data = await convessationRoom.findByIdAndUpdate(
            { _id: req.body.id },
            { updatedAt: new Date() }
        );

        res.send({ status: true });
    } catch (e) {
        res.send(e.toString());
    }
});
module.exports = router;
