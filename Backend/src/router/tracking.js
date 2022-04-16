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

        const data = await Tracking.find({ userId: req.user._id })
            .populate("tarsportId")
            .populate({
                path: 'tarsportId',
                populate: [{
                    path: "routeId",
                   
                },{
                    path: "truckId",   
                }]
            })
            .populate("paymentid")

        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
module.exports = router;