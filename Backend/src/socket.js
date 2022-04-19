const { io } = require("./app");
const myMessge = [];
io.on("connect", async (socket) => {
    socket.emit("welcome", "welcome to react Native")
    socket.on("onJoinChat", (data) => {
        socket.join(data)
      
        //io.to(data.room).emit("message", data.message)
        //console.log("ss",data)
    })


})