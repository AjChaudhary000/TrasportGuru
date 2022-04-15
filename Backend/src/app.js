const express = require('express');
const app = express()
const port = process.env.PORT
require('./database/db');
const path = require('path');
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
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = socketio(server)
app.use(userRouter)
app.use(truckRouter)
app.use(route)
app.use(transport)
app.use(chatroomrouter);
app.use(convesstionrouter);
app.use(paymentroute);
app.get('/', (req, res) => res.send('Hello World!'))
module.exports = { io }