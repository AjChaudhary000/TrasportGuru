const express = require('express');
const multer = require('multer');
const router = new express.Router();
const path = require('path')
const fs = require('fs');
const User = require('../model/user');
const nodemailer = require("nodemailer");
const OTP = require('../model/otp');
const auth = require('../middleware/auth');
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
            const user = new User({ email: req.body.email });
            const data = await user.save()
            const token = await data.genrateToken();
            return res.status(201).send({ data: data, token: token, account: '0' })
        }
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
const disk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/image/avatars")
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = "avt" + Date.now() + "A" + Math.round(Math.random() * 1000);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
})
const upload = multer({
    storage: disk,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('Please Upload an  Image '))
        }
        cb(undefined, true)
    }
})
router.post('/user/me', auth, upload.single('image'), async (req, res) => {

    console.log(req )
    if (req?.file) {
        console.log("hl")
        // if (req.user?.image) {
        //     fs.unlinkSync(`./src/image/avatars/${req.user.image}`);
        // }
        req.user.image = req.file.filename;
    }
    req.user.username = req.body.username;
    const data = await req.user.save();
    res.send(data)

}, (error, req, res, next) => { res.send(error.message) })

module.exports = router;






