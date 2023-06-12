const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const userRoutes = require("./routes/users.routes");
const uploadRoutes = require("./routes/upload.routes");
const postRoutes = require("./routes/post.routes");
const followRoutes = require("./routes/follow.routes");
const newfeedRoutes = require("./routes/newfeeds.routes");
const friendRoutes = require("./routes/friends.routes");
const commentsRoutes = require("./routes/comments.routes");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));

server.use("/post", postRoutes);

server.use("/upload", uploadRoutes);

server.use("/api/v1/users", userRoutes);

server.use("/follow", followRoutes);

server.use("/newfeeds", newfeedRoutes);

server.use("/friends", friendRoutes);

server.use("/comments", commentsRoutes);

server.listen(8001, () => {
  console.log("Server is running on http://localhost:8001");
});
