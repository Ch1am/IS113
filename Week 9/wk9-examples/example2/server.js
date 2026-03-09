// Week 9 - Example 2 - server.js

const express = require("express");
const server = express();
const fs = require("node:fs/promises");

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

server.get("/write-data", (req, res) => {
    res.render("info-form", { name: null });
});

server.post("/write-data", async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    try {
      const filePath = "form-data.json";
      const newEntry = {
        name: name, 
        age
      };
      const jsonData = JSON.stringify(newEntry, null, 2);
      await fs.writeFile(filePath, jsonData);

      res.render("info-form", { name });
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
