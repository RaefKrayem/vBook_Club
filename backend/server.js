const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDb } = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");

// Database Connection
connectDb();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// ---------------------------------------------------------------------------

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("User" + socket.id + " joined room: " + room);
  });

  socket.on("send_message", (message) => {
    console.log("sending message", message.content);
    console.log("to room", message.chat_id);
    socket.to(message.chat_id).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});

// body parser for raw json
app.use(express.json());
// body parser for url
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/friends", require("./routes/friendRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

// override the express default error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
