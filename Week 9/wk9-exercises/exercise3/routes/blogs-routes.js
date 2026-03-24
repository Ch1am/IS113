const express = require("express"); 
const router = express.Router();

// Import the blogs controller module
const blogsController = require("../controllers/blogs-controller"); 

// Define a GET route to display the blog form and list of posts
router.get("/blog-posts", blogsController.showForm);

// Define a POST route to handle form submission for a new blog post
router.post("/blog-posts", blogsController.submitPost);

// Export the router to be used in the main application
module.exports = router;
