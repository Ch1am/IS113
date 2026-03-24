const fs = require("node:fs/promises");
const filePath = "./data/blogs-data.json";

// Function to retrieve all blog posts from the JSON file
exports.getAllPosts = async () => {
  try {
    // Read the file content as a string
    const raw = await fs.readFile(filePath, "utf-8");

    // Parse and return the JSON as a JavaScript array
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading posts file:", error);
    throw error;
  }
};

// Function to append a new blog post to the JSON file
exports.appendPost = async (post) => {
  try {
    // Get all existing posts
    // This call style (`exports.getAllPosts()`) isn't best practice, 
    // but is used here to keep the code straightforward.
    const posts = await exports.getAllPosts();

    // Add the new post to the array
    posts.push(post);

    // Save the updated posts array back to the file
    const jsonPostsData = JSON.stringify(posts, null, 2);
    await fs.writeFile(filePath, jsonPostsData);
  } catch (error) {
    console.error("Error appending post:", error);
    throw error;
  }
};
