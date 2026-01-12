// Week 1 – Exercise 2 - server.js

// Import the built-in 'http' module 
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the http server and it’s responses to requests
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); 
    res.end('Hello from the server!');   
  } else {
    fs.readFile(path.join(__dirname, req.url), (e, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

// Define the hostname and port for the server
const hostname = 'localhost';
const port = 8000;

// Start server and listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





