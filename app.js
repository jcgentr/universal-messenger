const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3000;

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    console.log("total clients connected: ", io.sockets.sockets.size);
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("Env: ", process.env.NODE_ENV);
  console.log(`App listening at http://localhost:${port}/`);
});
