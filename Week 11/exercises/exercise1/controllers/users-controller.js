const User = require('../models/user-model');
const bcrypt = require('bcrypt');


exports.home = (req, res) => res.send('NOT IMPLEMENTED');

exports.stats = (req, res) => {
    req.session.visit_count = req.session.visit_count + 1 || 1;
    res.send('Number of visits: ' + req.session.visit_count);
}

exports.registerGet = (req, res) => {
    // since there is programming logic, the controller just pass it to view to render the page
    res.render('register')
}

exports.loginGet = (req, res) => {res.render('login')};

exports.loginPost = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // the idea is to fetch the user that matchs a given username from the database
    // and check if the user's password matches against the password stored in the database
    try {
        let user = await User.findUser(username);

        if (!user) {
            console.log("Invalid username");
            return res.redirect('login');

        } 
        let match = await bcrypt.compare(password, user.password);
        if (match) {
        //if (user.password == password) {

            req.session.user = {
                username: user.username,
                role: user.role
            }

            if (user.role == 'admin') {
                return res.redirect('/admin-profile');
            } else {
                return res.redirect('/profile');
            }
        
        } 
        
    } catch (error) {
        console.error("Error:", error.message);
        res.send(error);
    }
}

exports.profile = (req, res) => {

    //check if user exist in session, if yes mean user is already loggin in
    //otherwise, redirect to login page
    if(!req.session.user) {
        return res.redirect('/login')
    }

    res.render('profile', { user: req.session.user } )
}

exports.adminProfile = (req, res) => {
    //check if user exist in session, if yes mean user is already loggin in
    //otherwise, redirect to login page
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // check if the user is admin, if not redirect to profile page
    if (req.session.user.role != 'admin') {
        return res.redirect('/profile');
    }

    res.render('admin-profile', {user: req.session.user})
}

exports.logout = (req, res) => {
    // to log out, we just need to destroy the session
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

exports.registerPost = async (req, res) => {

    // the controller's role is to access data and do some processing
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    // for hashing the password
    let hashPassword = await bcrypt.hash(password, 10);

    let newUser = {
        // the key here should correspond to the schema defined in the model
        username: username,
        password: hashPassword,
        role: role
    };

    // to save the data, the controller will pass the task to model
    try {
        let result = await User.addUser(newUser);
        console.log(result)
        res.redirect('/login')
    } catch (error) {
        console.error("Error:", error.message);
        res.send(error);
    }
};

