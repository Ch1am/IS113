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

exports.loginGet = (req, res) => res.send('NOT IMPLEMENTED');

exports.loginPost = async (req, res) => res.send('NOT IMPLEMENTED');

exports.profile = (req, res) => res.send('NOT IMPLEMENTED');

exports.adminProfile = (req, res) => res.send('NOT IMPLEMENTED');

exports.logout = (req, res) => res.send('NOT IMPLEMENTED');
