const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log('SOCKET START ON ID',socket.id)
});

module.exports = {server,app};


