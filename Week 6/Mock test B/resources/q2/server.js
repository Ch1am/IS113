const express = require("express");
const server = express();
const path = require("path");

server.use("/", express.static(path.join(__dirname, "public")))
server.use(express.urlencoded({ extended: true }));

//Start of Express Router Code

const q1aProcess = require("./routes/q2a-process");
const q1b = require("./routes/q2b");
const q1bProcess = require("./routes/q2b-process");

server.use("/q2a-process", q1aProcess);
server.use("/q2b", q1b);
server.use("/q2b-process", q1bProcess);

//End of Express Router Code

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
