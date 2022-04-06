const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const TruckType = require('../model/truckType');
const TruckDetails = require('../model/truckDetails');
router.post('/trucktype/create', auth, async (req, res) => {
    try {
        const trucktype = new TruckType(req.body);
        const data = await trucktype.save();
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.get('/trucktype', auth, async (req, res) => {
    try {

        const data = await TruckType.find();
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.post('/truck/create', auth, async (req, res) => {
    try {
        const truckdetails = new TruckDetails({ tarsportUserId: req.user._id, ...req.body });
        const data = await truckdetails.save();
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.get('/truck', auth, async (req, res) => {
    try {

        const data = await TruckDetails.find({ tarsportUserId: req.user._id }).populate("tarsportUserId").populate("truckTypeId");
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.delete('/truck/delete/:_id', auth, async (req, res) => {
    try {
        const truck = await TruckDetails.findByIdAndDelete(req.params._id)
        res.status(200).send({ data: truck, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString, status: false })
    }
})
router.patch('/updatetruck/:_id', auth, async (req, res) => {
    try {
        const data = await TruckDetails.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true, })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
module.exports = router;