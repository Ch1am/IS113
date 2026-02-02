// Week 4 - Example 6 - server.js

const express = require("express");
const server = express();

const homeRoutes = require("./routes/home-route");
const aboutRoutes = require("./routes/about-route");

server.use("/", homeRoutes);
server.use("/about", aboutRoutes);

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
