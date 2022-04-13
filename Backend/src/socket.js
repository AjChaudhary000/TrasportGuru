const { io } = require("./app");
const myMessge = [];
io.on("connect", async (socket) => {
    socket.emit("welcome", "welcome to react Native")
    socket.on("sendMessage", (data) => {
        socket.join(data.room)
        myMessge.push(data)
        io.to(data.room).emit("welcome", "welcome to react Native")
        io.to(data.room).emit("message", data.message)
        // console.log(myMessge)
    })


})