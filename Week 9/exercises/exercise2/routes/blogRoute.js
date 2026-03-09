const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogController") //import the blog controller

// Route to display the blog form and all blog posts
router.get("/", blogController.displayForm);
// Route to handle form submission (new blog post)
router.post("/", blogController.processForm);

module.exports = router;