const { io } = require("./app");
io.on("connect", async (socket) => {
    socket.emit("welcome", "welcome to react Native")
    socket.on("onJoinChat", (data) => {
        socket.join(data)
    })


})