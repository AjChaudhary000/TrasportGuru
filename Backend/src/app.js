const express = require('express');
const app = express()
const port = process.env.PORT
const mongo = require('mongoose');
mongo.connect(process.env.MONGODB).then(() => console.log("connected")).catch((e) => {
    console.log(e)
})

const userRouter = require('./router/user');
app.use(express.json())
const cors = require('cors')
const socketio = require("socket.io");
app.use(cors())
const truckRouter = require('./router/truck');
const route = require('./router/route');
const transport = require('./router/transport');
const convesstionrouter = require('./router/convesstionrouter');
const chatroomrouter = require('./router/chatroomrouter');
const paymentroute = require('./router/payment');
const trackingroute = require('./router/tracking');
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = socketio(server)
app.set("io", io);
app.use(userRouter)
app.use(truckRouter)
app.use(route)
app.use(transport)
app.use(chatroomrouter);
app.use(convesstionrouter);
app.use(paymentroute);
app.use(trackingroute)
app.get('/', (req, res) => res.send('Hello World!'))
module.exports = { io }