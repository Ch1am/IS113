// DO NOT MODIFY THIS PART

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
    const filePath = path.join(__dirname, "public", req.url.substring(1));
    // Minimal MIME type handling
    const ext = path.extname(filePath).toLowerCase();
    const mime = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
    }[ext] || "application/octet-stream";
    fs.readFile(filePath, (e, data) => {
      if (e) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": mime });
      res.end(data);
    });
  }
});

// Define the hostname and port for the server
const hostname = '127.0.0.1';
const port = 8000;

// Start server and listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// DO NOT MODIFY THIS PART
