// server.js (Do not modify this file)
const path = require("path");
const express = require("express");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

const q3a = require("./routes/q3a");
const q3b = require("./routes/q3b");
server.use("/", q3a);
server.use("/", q3b);

server.get("/", (req, res) => {
  res.send(`
    <h1>Q3 Transport Selector</h1>
    <ul>
      <li><a href="/q3a-form.html">Part A: q3a-form.html</a></li>
      <li><a href="/q3b-one">Part B: /q3b-one</a></li>
    </ul>
  `);
});

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
