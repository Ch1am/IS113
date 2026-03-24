// Import blog model to interact with the data (e.g., reading/writing posts)
const Blog = require("../models/blog-model");

// Controller function to handle GET request and display the form with all blog posts
exports.showForm = async (req, res) => {
  try {
     // Fetch all posts from the model
    let posts = await Blog.getAllPosts();

    // Reverse the array to show latest posts first
    posts.reverse(); 

    // Render the EJS view and pass the posts to it
    res.render("blog-form", { posts });
  } catch (error) {
    res.send("Error reading posts"); 
  }
};

// Controller function to handle POST request and save a new blog post
exports.submitPost = async (req, res) => {
  const title = req.body.title; 
  const content = req.body.content;

  // If either title or content is missing, redirect back to the form
  if (!title || !content) return res.redirect("/blog-posts");

  const newPost = {
    title,
    content,
  };

  try {
    // Save new post using model function
    await Blog.appendPost(newPost);
    
    // Redirect back to blog form page
    res.redirect("/blog-posts"); 
  } catch (error) {
    res.send("Error saving post");
  }
};
