// DO NOT MODIFY THIS PART

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello from the server!");
  } else {
    fs.readFile(path.join(__dirname, req.url), (e, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
});

const hostname = "127.0.0.1";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// END OF DO NOT MODIFY THIS PART
