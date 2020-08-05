const express = require("express");

const server = express();

const postRouter = require("./routers/post.js");

server.use(express.json());

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send("hello world");
});

const port = 5555;
server.listen(port, () => {
  console.log(`CINCO CINCO CINCO CINCO!!!!! ${port}`);
});
