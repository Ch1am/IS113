//default import
const express = require("express");
const path = require("path");

//return a server object
const server = express().get(`/`,(req,res)=>{
    res.redirect('home.html')
});

//add middleware 
// server.get(`/`, (req,res) =>{
//     res.send(`Hello from experess server`)
// });

// this middle used to handle the incoming escaped enconded data
server.use( express.urlencoded({ extended : true }));
// this middleware is used to serve static file
server.use("/", express.static(path.join(__dirname, "public")));


//routing
server.get(`/about`,(req,res)=>{
    res.send(`this is an awesome bubble tea`);
});

// server.get(/a/,(req,res) =>{
//     res.send(`hey... this is also a route`);
// });

// server.post(`/account/login`,(req,res) =>{
//     //let userName = req.query.user //this is if using get instead of post
//     let userName = req.body.user
//     res.send(`hello user ${userName}`);
// });

// grouping related route
const account = require('./routes/account.js');
//const order = require(`./routes/order.js`);

// any route / URL that map to account will be handle by account object (router)
server.use(`/account`,account);
// any route / URL that map to account will be handle by order object
//server.use('/order', order);


const hostname = 'localhost'    
const port = 8000

const callback = function(){
    console.log(`Server running at http://${hostname}:${port}`);
};

server.listen(
    port,hostname,callback
);
