// Import the built-in 'http' module 
const http = require('http');
const fs = require('fs');
const url = require('url')
const path = require('path');


// Create the http server and it’s responses to requests
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); 
    res.end('Hello from the server!');   
  } 
  else if (req.url === '/register' && req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); 
    res.end('Registeration successful!');   
  } 
  else if (pathname === '/register' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); 
   
    res.end('Registeration successful!');   
  } 
  else {
    fs.readFile(path.join(__dirname, req.url), (e, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

// Define the hostname and port for the server
const hostname = 'localhost';
const port = 3000;

// Start server and listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





