const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv')
const session = require('express-session');
dotenv.config({path: './config.env'})

const server = express();

// Middleware setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.urlencoded({ extended: false }));

server.use(session({
    secret: 'any-secret-string',
    resave: false,
    saveUninitialized: false
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
