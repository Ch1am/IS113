const express = require('express')
const path = require('path')

const server = express()

const about = require('./routes/about')
const account = require('./routes/account')

const f = function(req, res) {
    console.log(req.path)
    res.send(`
            <nav>
                <a href="/about">About</a>
                <a href="/login.html">Login</a>
                <a href="/register.html">Register</a>
                <a href="/order">Order</a>
            </nav>
             <h1>Welcome to Bubbly Bliss</h1>
            <img src="./img/tea.jpeg" alt="">

            <p>"The first sip is a journey—a creamy, velvety embrace of brown sugar milk tea that balances on the edge of sweetness, before the sudden, satisfying chew of warm, caramel-infused tapioca pearls interrupts the smooth flow. It is a symphony of textures, a comforting, cold, and chewy experience that turns a simple afternoon tea break into a miniature celebration of Taiwanese invention."</p>   
        
        `)
}
server.get('/', f)

server.post('/process-form', (req, res) => {
    let userName = req.body.fullName

    res.send(`Hello ${userName}`)
})


server.use(express.urlencoded( { extended : true} ) )

// Configure view engine to EJS
// server.set() method is used to configure EJS as the view (templating) engine.
// By default, Express looks for .ejs files in the views folder for rendering templates.
server.set("view engine", "ejs");

server.use('/about', about)
server.use('/account', account)
server.use('/order', order)


server.use(express.static(path.join(__dirname, "public")))

// define hostname and port for the server
const hostname = 'localhost'
const port = 3000
// start server and listen to incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
    console.log(`dirname: ${__dirname}`)
} )

