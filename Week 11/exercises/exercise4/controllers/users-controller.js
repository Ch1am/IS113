const User = require('../models/user-model');

exports.home = (req, res) => res.send('NOT IMPLEMENTED');

exports.stats = (req, res) => {
    req.session.visit_count = req.session.visit_count + 1 || 1;
    res.send('Number of visits: ' + req.session.visit_count);
}

exports.registerGet = (req, res) => {
    res.render('register');
}

exports.registerPost = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        };
        await User.addUser(user);
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
}

exports.loginGet = (req, res) => {
    res.render('login');
}

exports.loginPost = async (req, res) => {
    try {
        const user = await User.findUser(req.body.username);
        if (!user) {
            console.log("User not found");
            return res.redirect('/login');
        }

        const match = req.body.password == user.password;
        if (!match) {
            console.log("Password mismatch");
            return res.redirect('/login');
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        }

        res.redirect('/profile');

    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
}

exports.profile = (req, res) => res.send('NOT IMPLEMENTED');

exports.adminProfile = (req, res) => res.send('NOT IMPLEMENTED');

exports.logout = (req, res) => res.send('NOT IMPLEMENTED');
