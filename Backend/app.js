const express = require("express");
const app = express();
const port = process.env.PORT;
const mongo = require("mongoose");
mongo
    .connect(process.env.MONGODB)
    .then(() => console.log("connected"))
    .catch((e) => {
        console.log(e);
    });

const userRouter = require("./src/router/user");
app.use(express.json());
const cors = require("cors");
const socketio = require("socket.io");
app.use(cors());
const truckRouter = require("./src/router/truck");
const route = require("./src/router/route");
const transport = require("./src/router/transport");
const convesstionrouter = require("./src/router/convesstionrouter");
const chatroomrouter = require("./src/router/chatroomrouter");
const paymentroute = require("./src/router/payment");
const trackingroute = require("./src/router/tracking");
const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
const io = socketio(server);
app.set("io", io);
app.use(userRouter);
app.use(truckRouter);
app.use(route);
app.use(transport);
app.use(chatroomrouter);
app.use(convesstionrouter);
app.use(paymentroute);
app.use(trackingroute);
app.get("/", (req, res) => res.send("Hello World!"));
module.exports = { io };
