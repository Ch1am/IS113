// Week 9 - Example 1 - server.js

const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

server.get("/advice-search", (req, res) => {
  res.render("advice-form", { error: null, advice: null, query: null });
});

server.post("/advice-search", async (req, res) => {
  const keyword = req.body.keyword.toLowerCase();

  if (!keyword) {
    return res.render("advice-form", {error: "Please enter a keyword.", advice: null, query: null });
  }

  try {
    const response = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`);
    const data = await response.json();
    
    if (data.total_results && data.slips.length > 0) {
      res.render("advice-form", {advice: data.slips, error: null, query: keyword});
    } else {
      res.render("advice-form", {advice: null, error: `No advice for "${keyword}".`, query: keyword});
    }
  } catch (error) {
    res.status(500).send("Failed to fetch advice.");
  }
});

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
