const blogModel = require("../models/blogModel");

//controller have to export method so that the router can use them
exports.displayForm = async (req, res) => {
    // Render the EJS view and pass the posts to it
    let posts = [];
    posts = await blogModel.retrieveAllPost();

    res.render("blog-form", {posts} )
  }


exports.processForm = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // If either title or content is missing, redirect back to the form
  if (!title || !content) return res.redirect("/blog-post");

  const newPost = {
    title: title,
    content: content
  }
  
  try {
    // Add code that read posts from the file and add the new post into the file
    let posts = []
    const raw = await fs.readFile(filePath, "utf-8");

    if (raw){
      posts = JSON.parse(raw)
    }
    posts.push(newPost)
    const jsonData = JSON.stringify(posts , null, 2)
    await fs.writeFile(filePath, jsonData)
   
    // Redirect to the blog form page to show updated list
    res.redirect("blog-posts");
    
  } catch (error) {
    console.error("Error saving blog post:", error);
  }
}