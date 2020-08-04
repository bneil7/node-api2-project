const express = require("express");

const server = express();

server.use(express.json());

server.get("/hello", (req, res) => {
  res.send("hello world");
});

const port = 5555;
server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
