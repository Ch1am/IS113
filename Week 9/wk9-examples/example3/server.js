// Week 9 - Example 3 - server.js

const express = require("express");
const server = express();
const fs = require("node:fs/promises");

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

let selectedCategory = "";
let filteredItems = {};

server.get("/display-data", (req, res) => {
  res.render("display-form", {
    selectedCategory: selectedCategory || null,
    filteredItems: selectedCategory ? filteredItems : null,
  });
});

server.post("/display-data", async (req, res) => {
    selectedCategory = req.body.category;

    try {
      const rawData = await fs.readFile("stock-data.json", "utf-8");
      const items = JSON.parse(rawData);

      filteredItems = {};
      for (const key in items) {
        if (items[key] === selectedCategory) {
          filteredItems[key] = items[key];
        }
      }
      
      res.render("display-form", {
        selectedCategory: selectedCategory || null,
        filteredItems: selectedCategory ? filteredItems : null,
      });
    } catch (error) {
      console.error("Error reading data:", error);
    }
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
