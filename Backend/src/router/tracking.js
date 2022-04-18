const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Tracking = require('../model/tracking');
router.post('/tracking', auth, async (req, res) => {
    try {
        const TrackingData = new Tracking({ userId: req.user._id, ...req.body })
        const data = await TrackingData.save();
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ error: e, status: false })
    }
})
router.get('/tracking', auth, async (req, res) => {
    try {

        const data = await Tracking.find({ userId: req.user._id }).sort({ createdAt: -1 })
            .populate("tarsportId")
            .populate("paymentid")

        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.get('/tracking/:id', auth, async (req, res) => {
    try {

        const data = await Tracking.find({ userId: req.user._id, _id: req.params.id })
            .populate({
                path: 'tarsportId',
                populate: [{
                    path: "routeId",

                }, {
                    path: "truckId",
                }, {
                    path: "driverId",
                },{
                    path: "tarsportUserId",
                }]
            })
            .populate("paymentid")

        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
module.exports = router;