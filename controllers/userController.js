'use strict';

var UserRepository = require('../repositories/userRepository');
var User = require('../models/user');

exports.getAllUsers = function (req, res) {
    var promise = UserRepository.getAllUsers();
    promise.then(function (users) {
        return res.json({success: true, data: users});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get users', error: err});
    });
};

exports.getUserById = function (req, res) {
    var promise = UserRepository.getUserById(req.params.id);
    promise.then(function (user) {
        return res.json({success: true, data: user});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get result', error: err});
    });
};

exports.deleteUser = function (req, res) {
    var promise = UserRepository.deleteUser(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'User removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove result', error: err});
    });
};


// # Extra functions

exports.updateUser = function (req, res) {
    var promise = UserRepository.updateUser(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'User updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update user', error: err});
    });
};

exports.addUser = function (req, res) {
    var newUser = new User(req.body);
    var promise = UserRepository.addUser(newUser);
    promise.then(function (user) {
        return res.json({success: true, msg: 'User created', data: user});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create user', error: err});
    });
};

/*exports.authenticateUser = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user;

    var promise = UserRepository.getUserByEmail(email);
    promise.then(function (usr) {
        if (!usr) {
            return res.status(404).json({success: false, msg: 'User not found'});
        }
        user = usr;
        return bcrypt.compare(password, usr.password);
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get user', error: err});
    }).then(function (isMatch) {
        if (isMatch) {
            var token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800
            });
            return res.json({
                success: true,
                token: 'JWT ' + token,
                user: user
            });
        }
        else {
            return res.status(403).json({success: false, msg: 'Wrong password'});
        }
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to match passwords', error: err});
    });
};

exports.getProfile = function (req, res) {
    return (req.user) ? res.json({user: req.user.data}) : res.json({});
};*/

exports.getUserByEmail = function (req, res) {
    var promise = UserRepository.getUserByEmail(req.params.email);
    promise.then(function (user) {
        if (!user){
            return res.json({success: false, data: "Email not found"});
        }
        return res.json({success: true, data: user});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get user by email', error: err});
    });
};