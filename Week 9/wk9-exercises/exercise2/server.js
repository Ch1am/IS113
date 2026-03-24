// Week 9 - Exercise 2 - server.js

const express = require("express");
const server = express();
const fs = require("node:fs/promises");

// START YOUR CODE HERE
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

// File path for storing blog posts
const filePath = "blogs-data.json";

// Route to display the blog form and all blog posts
server.get("/blog-posts", async (req, res) => {
  try {
    // Read blog data from file and parse JSON string into an array
    const raw = await fs.readFile(filePath, "utf-8");
    const posts = raw.trim() ? JSON.parse(raw) : [];

    // Reverse the order to show newest posts first
    posts.reverse();

    // Render the EJS view and pass the posts to it
    res.render("blog-form", { posts }); //
  } catch (error) {
    console.error("Error reading posts file:", error);
  }
});

// Route to handle form submission (new blog post)
server.post("/blog-posts", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // Construct a JavaScript object for the new post
  const newPost = {
    title,
    content,
  };

  // If either title or content is missing, redirect back to the form
  if (!title || !content) return res.redirect("/blog-post");

  try {
    let posts = [];

    // Try reading existing posts from the file
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      posts = JSON.parse(raw);
    } catch (error) {
      console.error("Error reading posts file:", error);
    }

    // Add new post to the posts array
    posts.push(newPost);

    // Save the updated posts array back to the file
    const jsonPostsData = JSON.stringify(posts, null, 2);
    await fs.writeFile(filePath, jsonPostsData);

    // Redirect to the blog form page to show updated list
    res.redirect("/blog-posts");
  } catch (error) {
    console.error("Error saving blog post:", error);
  }
});
// END OF YOUR CODE HERE

const hostname = "localhost";
const port = 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
