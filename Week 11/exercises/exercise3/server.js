const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const server = express();

// Middleware setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.urlencoded({ extended: false }));

const secret = process.env.SECRET;
server.use(session({
    secret: secret, // sign the session ID cookie. should be a long, random, and secure string, preferably stored in an environment variable
    resave: false, // Prevents the session from being saved back to the session store if nothing has changed.
    saveUninitialized: false // Prevents a new, empty session from being saved to the store.
}));

// Routes
const usersRoutes = require("./routes/users-routes");
server.use('/', usersRoutes);

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

function startServer() {
    const hostname = "localhost";
    const port = 8000;

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

connectDB().then(startServer);
