/* 
    In this exercise, you are to solve a series of tasks listed as Task1, Task2, etc.
    by coping the relevant code / files given in reference.js and order.html

    After each task, test that your solution is working
*/
const express = require('express')
const path = require('path')

const server = express()


// Task1: add code that serves static files stored in public folder
server.use("/", express.static(path.join(__dirname, "public")))

// Task2: add code that parses encoded form data submitted via POST
server.use(express.urlencoded( { extended : true} ) )

// Task3: add code that serves the home page of bubbly-bliss at the web root "/"
server.get('/', (req, res) => {
    res.send(`Hello from express server`)
} )


// Task4: add code that transfer account-related to routes "/account" to account.js

// Task5: add code that configure view engine to EJS
server.set("view engine", "ejs");

// Task6: create "views" folder and create order.ejs file in "views" folder

// Task7: add code that handles bubble tea order request sent to "/order" and render the result via order.ejs (copy code from order.html)
server.get('/order', (req, res) => {

    let userName = req.query.user // undefined
    let email = req.query.email
    let tea = req.query.tea
    let sugar = req.query.sugar
    let ice = req.query.ice
    let toppings = req.query.toppings
    let notes = req.query.notes

    let errors = []

    // form input validation logic 
    if (userName != undefined && userName == "") {
        errors.push('Username cannot be empty')
    }

    res.render('order', { 
        userName, email, tea, sugar, ice, toppings, notes, errors
    } )

} )

// Task0: change the port to avoid conflict with another server
const hostname = '127.0.0.1'
const port = 8000
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
    console.log(`dirname: ${__dirname}`)
} )