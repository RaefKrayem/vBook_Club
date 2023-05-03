const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDb } = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// Database Connection
connectDb();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// body parser for raw json
app.use(express.json());
// body parser for url
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/friends", require("./routes/friendRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

// https://www.youtube.com/watch?v=jD7FnbI76Hg

// override the express default error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
