const express = require('express');
const multer = require('multer');
const router = new express.Router();
const path = require('path')
const fs = require('fs');
const User = require('../model/user');
const nodemailer = require("nodemailer");
const OTP = require('../model/otp');
const auth = require('../middleware/auth');
const Driver = require('../model/Driver');
const accountSid = "ACfeb6acb7c389dcfa42a021d7ac8236ea";
const authToken = "2734bccec803bc8ad5c29486568a2de2";
const client = require('twilio')(accountSid, authToken);
router.post('/sendemail', async (req, res) => {

    try {
        const otpvalue = Math.round(Math.random() * 100000).toString().slice(0, 4);
        // let testAccount = await nodemailer.createTestAccount();
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: "transportguru8@gmail.com",
        //         pass: "chaudhary.dcs22",
        //     },
        // });
        // let info = await transporter.sendMail({
        //     from: "transportguru8@gmail.com",
        //     to: req.body.email,
        //     subject: "Trasport guru send otp ... ✔",
        //     text: `hii ${req.body.email} OTP ${otpvalue}`,
        //     //  html: "<b>Hello world?</b>",
        // })
        const otp = new OTP({ email: req.body.email, otp: otpvalue });
        await otp.save()
        res.status(201).send({ email: req.body.email, status: true })
    } catch (e) {
        console.log(e.toString())
        res.status(400).send(e)
    }
});
router.post('/sendsms', async (req, res) => {
    try {
        const otpvalue = Math.round(Math.random() * 100000).toString().slice(0, 4);
        // client.messages
        //     .create({
        //         body: `Trasnport Guru Verify Otp :- ${otpvalue}`,
        //         from: '+19378263797',
        //         to: req.body.mobileno
        //     })
        //     .then(message => console.log(message.sid));
        const otp = new OTP({ mobileno: req.body.mobileno, otp: otpvalue });
        await otp.save()
        res.status(201).send({ mobileno: req.body.mobileno, status: true })
    } catch (e) {
        console.log(e.toString())
        res.status(400).send(e)
    }
});
router.post('/verifyuser', async (req, res) => {
    try {
        const UserData = await OTP.findOne({ email: req.body.email, otp: req.body.otp })

        if (UserData === null) return res.status(404).send({ data: 'otp invalid' })
        const UserList = await User.findOne({ email: req.body.email });
        if (UserList) {
            const token = await UserList.genrateToken();
            return res.status(201).send({ data: UserList, token: token, account: '1', status: true })
        } else {
            const user = new User({ email: req.body.email, accountType: "User" });
            const data = await user.save()
            const token = await data.genrateToken();
            return res.status(201).send({ data: data, token: token, account: '0', status: true })
        }
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.post('/verifySmsUser', async (req, res) => {
    try {
        const UserData = await OTP.findOne({ mobileno: req.body.mobileno, otp: req.body.otp })
        if (UserData === null) return res.status(404).send({ data: 'otp invalid ' })
        const UserList = await User.findOne({ mobileno: req.body.mobileno });
        if (UserList) {
            console.log("my data ", UserList)
            const token = await UserList.genrateToken();
            console.log("my token", token)
            return res.status(201).send({ data: UserList, token: token, account: '1', status: true })
        } else {
            const user = new User({ mobileno: req.body.mobileno, accountType: "User" });
            console.log("my user ", user)
            const data = await user.save()
            console.log("my user ", data)
            const token = await data.genrateToken();
            return res.status(201).send({ data: data, token: token, account: '0', status: true })
        }
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
router.post('/user/me', auth, async (req, res) => {
    req.user.username = req.body.username;
    req.user.image = req.body.image;
    const data = await req.user.save();
    res.send({ data, status: 'true' })

},
    (error, req, res, next) => {
        res.send(error.message)
    })
router.get('/user/me', auth, async (req, res) => {
    res.send({ data: await req.user })

}, (error, req, res, next) => {
    res.send(error.message)
})
router.post('/user/trasportaccount', auth, async (req, res) => {
    try {
        req.user.accountType = "Admin"
        req.user.trasportAccount = req.user.trasportAccount.concat(req.body);
        const data = await req.user.save()
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString(), status: false })
    }
})
router.patch('/user/trasportaccount', auth, async (req, res) => {
    try {
        req.user.trasportAccount[0].trasportName = req.body?.trasportName;
        req.user.trasportAccount[0].trasportAddress = req.body?.trasportAddress;
        req.user.trasportAccount[0].trasportImage = req.body?.trasportImage;

        const data = await req.user.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.delete('/user/trasportaccount', auth, async (req, res) => {
    try {
        req.user.trasportAccount.pop()
        req.user.accountType = "User"

        const data = await req.user.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.post('/verifyDriver', auth, async (req, res) => {
    try {
        const DriverData = await OTP.findOne({ email: req.body.driverEmail, otp: req.body.driverOtp })

        if (DriverData === null) return res.status(404).send({ data: 'otp invalid' })
        const DriverInfo = {
            driverName: req.body.driverName,
            driverEmail: req.body.driverEmail,
            driverMobileNo: req.body.driverMobileNo,
            driverImage: req.body.driverImage
        }
        const driver = new Driver({ tarsportUserId: req.user._id, ...DriverInfo })
        const data = await driver.save()
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
router.get('/driver', auth, async (req, res) => {
    try {

        const data = await Driver.find({ tarsportUserId: req.user._id }).populate("tarsportUserId")
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.delete('/driver/delete/:_id', auth, async (req, res) => {
    try {

        const driver = await Driver.findByIdAndDelete(req.params._id)
        res.status(200).send({ data: driver, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString, status: false })
    }
})
router.patch('/updateDriver/:_id', auth, async (req, res) => {
    try {
        const DriverData = await OTP.findOne({ email: req.body.driverEmail, otp: req.body.driverOtp })

        if (DriverData === null) return res.status(404).send({ data: 'otp invalid' })
        const DriverInfo = {
            driverName: req.body.driverName,
            driverEmail: req.body.driverEmail,
            driverMobileNo: req.body.driverMobileNo,
        }

        const data = await Driver.findByIdAndUpdate({ _id: req.params._id }, DriverInfo, { new: true, })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
router.patch('/updateUser/:_id', auth, async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true, })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString(), status: false })
    }
})
module.exports = router;






