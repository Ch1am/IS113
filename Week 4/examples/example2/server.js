// Week 4 - Example 2 - server.js

// Import the built-in "http" module 
const http = require("http");

// Create http server and it’s responses(res) to requests(req)
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); 
    res.end("Hello from the server");   
  } 
});

// Define the hostname and port for the server
const hostname = "localhost";
const port = 8000;

// Start server and listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});