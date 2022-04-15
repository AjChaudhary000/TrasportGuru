const express = require('express');

const router = new express.Router();
const auth = require('../middleware/auth');
const Route = require('../model/route');
const Transport = require('../model/trasnsportList');

router.post('/route/create', auth, async (req, res) => {
    try {

        const routeData = new Route({ tarsportUserId: req.user._id, ...req.body });
        const data = await routeData.save();
        res.status(201).send({ data: data, status: true })
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

router.post('/searchRoute', auth, async (req, res) => {
    try {
        const data = await Transport.find()
            .populate("routeId").populate("truckId").populate("tarsportUserId");
        const routeList = data.
            filter(item => ((item.truckId.truckCapicity - item.capicity) >= req.body.capicity)).
            map(item => {



                if (item.routeId.from.name === req.body.from && item.routeId.destination.name === req.body.destination) {
                    if (item.Truckdate > new Date()) {
                        return item
                    }

                } else {
                    if (item.routeId.from.name === req.body.from) {
                        const destination = item.routeId.routeStop.
                            filter(destination => (destination.stops === req.body.destination) && (item.Truckdate.setHours(item.Truckdate.getHours() + destination.avgTime) > new Date()))
                        if (destination.length !== 0) return item
                    }
                    else if (item.routeId.destination.name === req.body.destination) {
                        const from = item.routeId.routeStop.
                            filter(from => (from.stops === req.body.from) && (item.Truckdate.setHours(item.Truckdate.getHours() + from.avgTime) > new Date()))
                        if (from.length !== 0) return item
                    } else {
                        const count = item.routeId.routeStop.length
                        const index = item.routeId.routeStop.map(item => item.stops).indexOf(req.body.from)
                        if (index >= 0) {
                            for (let i = 0; i < count; i++) {
                                if (i > index) {
                                    if (item.routeId.routeStop[i].stops === req.body.destination) {
                                        return item
                                    }
                                }
                            }
                        }
                    }
                }
            }).filter(item => item !== undefined)
        // const mydata = 
        res.status(200).send(routeList)
    } catch (e) {
        res.status(400).send({ error: e.toString() })
    }
})
module.exports = router;