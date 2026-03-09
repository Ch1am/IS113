// Week 9 - Example 4 - server.js

const express = require("express");
const server = express();
const stocksRoutes = require("./routes/stocks-routes");

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

server.use("/", stocksRoutes);

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
