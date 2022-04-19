const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Transport = require('../model/trasnsportList');
const User = require('../model/user');
router.post('/transport/create', auth, async (req, res) => {
    try {
        const trasnsportData = new Transport({ tarsportUserId: req.user._id, ...req.body });
        const data = await trasnsportData.save();
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.get('/transport', auth, async (req, res) => {
    try {
       
        const data = await Transport.find({ tarsportUserId: req.user._id }).skip(req.query.skip || 0).limit(req.query.limit ||0)
            .populate("tarsportUserId")
            .populate("routeId")
            .populate("truckId")
            .populate("driverId");
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.get('/transportById/:id', auth, async (req, res) => {
    try {

        const data = await Transport.find({ _id: req.params.id })
            .populate("tarsportUserId")
            .populate("routeId")
            .populate("truckId")
            .populate("driverId");
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.delete('/transport/delete/:_id', auth, async (req, res) => {
    try {
        const data = await Transport.findByIdAndDelete(req.params._id)
        res.status(200).send({ data: data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString, status: false })
    }
})
router.patch('/transport/update/:_id', auth, async (req, res) => {
    try {
        const data = await Transport.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true, })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
router.get('/transportCompanyList', auth, async (req, res) => {
    try {
        const data = await User.find({ accountType: "Admin" })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
module.exports = router;