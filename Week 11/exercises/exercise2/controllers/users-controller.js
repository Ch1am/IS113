const User = require('../models/user-model');

exports.home = (req, res) => res.send('NOT IMPLEMENTED');

exports.stats = (req, res) => {
    req.session.visit_count = req.session.visit_count + 1 || 1;
    res.send('Number of visits: ' + req.session.visit_count);
}

exports.registerGet = (req, res) => res.send('NOT IMPLEMENTED');

exports.registerPost = async (req, res) => res.send('NOT IMPLEMENTED');

exports.loginGet = (req, res) => res.send('NOT IMPLEMENTED');

exports.loginPost = async (req, res) => res.send('NOT IMPLEMENTED');

exports.profile = (req, res) => res.send('NOT IMPLEMENTED');

exports.adminProfile = (req, res) => res.send('NOT IMPLEMENTED');

exports.logout = (req, res) => res.send('NOT IMPLEMENTED');
