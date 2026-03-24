// Week 9 - Extra Exercises Solutions - Question 9 - server.js
// -----------------------------------------------------------

const express = require("express");
const path = require("path");

const server = express();

// View engine
server.set("view engine", "ejs");

// Middleware
server.use(express.urlencoded({ extended: true }));         // parse form 
server.use(express.static(path.join(__dirname, "public"))); // serve /public

// Routes (MVC)
const songsRoutes = require("./routes/songs-routes");
server.use("/", songsRoutes);


// Start server
const hostname = "localhost";
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});