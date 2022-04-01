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
router.post('/sendemail', async (req, res) => {

    try {
        const UserData = new User(req.body);
        const otpvalue = Math.round(Math.random() * 100000).toString().slice(0, 4);
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "ajchaudharyjat00@gmail.com",
                pass: "chaudharyjat00",
            },
        });
        let info = await transporter.sendMail({
            from: 'ajchaudharyjat00@gmail.com',
            to: req.body.email,
            subject: "Trasport guru send otp ... ✔",
            text: `hii ${req.body.email} OTP ${otpvalue}`,
            //  html: "<b>Hello world?</b>",
        })
        const otp = new OTP({ email: req.body.email, otp: otpvalue });
        await otp.save()
        res.status(201).send({ email: req.body.email, status: true })
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
            return res.status(201).send({ data: UserList, token: token, account: '1' })
        } else {
            const user = new User({ email: req.body.email, accountType: "User" });
            const data = await user.save()
            const token = await data.genrateToken();
            return res.status(201).send({ data: data, token: token, account: '0' })
        }
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
// const disk = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./src/image/avatars")
//     },

//     filename: function (req, file, cb) {
//         const uniqueSuffix = "avt" + Date.now() + "A" + Math.round(Math.random() * 1000);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
// })
// const upload = multer({
//     storage: disk,
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//             return cb(new Error('Please Upload an  Image '))
//         }
//         cb(undefined, true)
//     }
// })
router.post('/user/me', auth, async (req, res) => {
    req.user.username = req.body.username;
    req.user.image = req.body.image;
    const data = await req.user.save();
    res.send({ data, status: 'true' })

}, (error, req, res, next) => { res.send(error.message) })

router.get('/user/me', auth, async (req, res) => {
    res.send({ data: await req.user })

}, (error, req, res, next) => { res.send(error.message) })

router.post('/user/trasportaccount', auth, async (req, res) => {
    try {
        req.user.accountType = "Admin"
        req.user.trasportAccount = req.user.trasportAccount.concat(req.body);
        const data = await req.user.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
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
router.post('/driver/create', auth, async (req, res) => {
    try {

        const driver = new Driver({ tarsportUserId: req.user._id, ...req.body })
        const data = await driver.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
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
module.exports = router;






