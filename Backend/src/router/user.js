const express = require('express');
const router = new express.Router();
const User = require('../model/user');

const OTP = require('../model/otp');
const auth = require('../middleware/auth');
const Driver = require('../model/driver');
const sendEmailBox = require('./sendEmailBox');
const accountSid = "ACfeb6acb7c389dcfa42a021d7ac8236ea";
const authToken = "2734bccec803bc8ad5c29486568a2de2";
const client = require('twilio')(accountSid, authToken);
router.post('/sendemail', async (req, res) => {
    try {
        const otpvalue = Math.round(Math.random() * 100000).toString().slice(0, 4);
        await sendEmailBox(req.body.email, otpvalue)
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
        //         body: `Hi, Enter this verification code in field ${otpvalue} Verification code is valid only for 60 second`,
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
            const user = new User({ email: req.body.email, accountType: "User", emailVerify: true });
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
            const user = new User({ mobileno: req.body.mobileno, accountType: "User", mobileNoVerify: true });
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
router.post('/googleSignIn', async (req, res) => {
    try {
        const UserList = await User.findOne({ email: req.body.email });
        if (UserList) {
            const token = await UserList.genrateToken();
            return res.status(201).send({ data: UserList, token: token, status: true })
        } else {
            const user = new User({ ...req.body, accountType: "User", emailVerify: true });
            const data = await user.save()
            const token = await data.genrateToken();
            return res.status(201).send({ data: data, token: token, status: true })
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

        const data = await Driver.find({ tarsportUserId: req.user._id, deleteData: false }).populate("tarsportUserId")
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.delete('/driver/delete/:_id', auth, async (req, res) => {
    try {

        const driver = await Driver.findByIdAndUpdate({ _id: req.params._id }, { deleteData: true }, { new: true })
        res.status(200).send({ data: driver, status: true })
    } catch (e) {
        res.status(400).send({ data: e.toString, status: false })
    }
})
router.patch('/updateDriver/:_id', auth, async (req, res) => {
    try {

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
router.get('/userEmailCheck/:email', auth, async (req, res) => {
    try {
        const data = await User.find({ email: req.params.email })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.get('/userMobileNoCheck/:mobileno', auth, async (req, res) => {
    try {
        const data = await User.find({ mobileno: req.params.mobileno })
        res.status(201).send({ data, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.post('/userEmailVerify', auth, async (req, res) => {
    try {
        const UserData = await OTP.findOne({ email: req.body.email, otp: req.body.otp })
        if (UserData === null) return res.status(404).send({ data: 'otp invalid' })
        res.status(201).send({ data: UserData, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
router.post('/userMobileNoVerify', auth, async (req, res) => {
    try {
        const UserData = await OTP.findOne({ mobileno: req.body.mobileno, otp: req.body.otp })
        if (UserData === null) return res.status(404).send({ data: 'otp invalid' })
        res.status(201).send({ data: UserData, status: true })
    } catch (e) {
        res.status(400).send({ "error": e.toString() })
    }
})
module.exports = router;






