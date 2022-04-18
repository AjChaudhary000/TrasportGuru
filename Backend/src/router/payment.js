const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Payment = require('../model/payment');
router.post('/payment', auth, async (req, res) => {
    try {
        const paymentData = new Payment({ userId: req.user._id, ...req.body })
        const data = await paymentData.save();
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ error: e, status: false })
    }
})
router.patch('/payment/:id', auth, async (req, res) => {
    try {
        const paymentData = await Payment.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        console.log(paymentData)
        res.status(201).send({ data: paymentData, status: true })
    } catch (e) {
        res.status(400).send({ error: e, status: false })
    }
})
module.exports = router;