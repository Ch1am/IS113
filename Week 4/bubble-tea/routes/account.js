const express = require('express')
const router = express.Router()

router.get(`/`,(req,res) =>{
    res.redirect(`/login.html`)
});

router.post(`/login`,(req,res) =>{
    //let userName = req.query.user //this is if using get instead of post
    let userName = req.body.user
    res.send(`hello user ${userName}`);
});

router.post('/register', (req,res) =>{
    res.send('Account created')
});

module.exports = router