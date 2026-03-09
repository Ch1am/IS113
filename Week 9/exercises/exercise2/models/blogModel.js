const fs = require("node:fs/promises");
const { post } = require("../routes/blogRoute");

// File path for storing blog post
const filePath = "blogs-data.json";

// Read blog data from file and parse JSON string into an array
exports.retrieveAllPost = async() => {
    try {
        let posts = [] // array of post
        const raw = await fs.readFile(filePath, "utf-8");

        if (raw){
        posts = JSON.parse(raw)
        }
        return posts

    } catch (error) {
    console.error("Error reading posts file:", error);
    }
    return []
}; // must be a async method as it contain file read operation

// exports.createNewPost = async() => {


// };