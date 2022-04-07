const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Route = require('../model/route');
router.post('/route/create', auth, async (req, res) => {
    try {
        const routeData = new Route({ tarsportUserId: req.user._id, ...req.body });
        const data = await routeData.save();
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.get('/route', auth, async (req, res) => {
    try {

        const data = await Route.find({ tarsportUserId: req.user._id }).populate("tarsportUserId");
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.delete('/route/delete/:_id', auth, async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params._id)
        res.status(200).send({ data: route, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString, status: false })
    }
})
router.patch('/route/update/:_id', auth, async (req, res) => {
    try {
        const data = await Route.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true, })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
module.exports = router;