const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');

const personRouter = require('./routes/person-routes');

const server = express();

// make sure u add this line when you are using Express to do form (POST)
server.use(express.urlencoded()); 

// express.json() is a middleware
server.use(express.json());

// Set EJS as the view engine for rendering dynamic HTML pages
server.set("view engine", "ejs"); 

// root routes
server.use('/', personRouter);


// Specify the path to the environment variablef file 'config.env'
dotenv.config({ path: './config.env' });

// Replace <PASSWORD> with actual DB password (environment variable)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to DB
mongoose.connect(DB).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!');
});

//console.log(server.get('env')); // Get 'env' environment variable set by Express
//console.log(process.env);

// Start up a web server
const hostname = "localhost"; // Define server hostname
const port = 8002; // Define port number

// Start the server and listen on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});