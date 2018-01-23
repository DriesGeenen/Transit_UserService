'use strict';

var UserRepository = require('../repositories/userRepository');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.getAllUsers = function (req, res) {
    var promise = UserRepository.getAllUsers(req);
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
    var promise = UserRepository.deleteUser(req);
    promise.then(function () {
        return res.json({success: true, msg: 'User removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove result', error: err});
    });
};


// # Extra functions

exports.updateUser = function (req, res) {
    var promise;
    const newUser = new User(req.body);
    console.log(newUser);
    if (newUser.password) {
        promise = bcrypt.genSalt(10);

        promise.then(function (salt) {
            return bcrypt.hash(newUser.password, salt);
        }, function (err) {
            return res.status(500).json({success: false, msg: 'Failed to update user (salt)', error: err});
        }).then(function (hash) {
            req.body.password = hash;
            return UserRepository.updateUser(req);
        }, function (err) {
            return res.status(500).json({success: false, msg: 'Failed to update user (updateWsalt)', error: err});
        }).then(function () {
            return res.json({success: true, msg: 'User updated'});
        }, function (err) {
            return res.status(500).json({success: false, msg: 'Failed to update user', error: err});
        });
    } else {
        promise = UserRepository.updateUser(req);
        promise.then(function () {
            return res.json({success: true, msg: 'User updated'});
        }, function (err) {
            return res.status(500).json({success: false, msg: 'Failed to update user (Npass)', error: err});
        });
    }
};

exports.registerUser = function (req, res) {
    const newUser = new User(req.body);
    var promise = UserRepository.addUser(newUser);
    promise.then(function (user) {
        return res.json({success: true, msg: 'User created', data: user});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create user', error: err});
    });
};

exports.authenticateUser = function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    var user;

    var promise = UserRepository.getUserByName(name);
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
            const token = jwt.sign({data: user}, config.secret, {
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
    var promise = UserRepository.getUserById(req.user.data._id);
    promise.then(function (user) {
        return res.json({success: true, user: user});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get result', error: err});
    });

    //return (req.user)? res.json({user: req.user.data}):res.json({});
};
