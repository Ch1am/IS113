// server.js (Do not modify this file)
const path = require("path");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const q3a = require("./routes/q3a");
const q3b = require("./routes/q3b");
app.use("/", q3a);
app.use("/", q3b);

app.get("/", (req, res) => {
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});