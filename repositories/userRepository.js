'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getAllUsers = function () {
    return User.find({}).select('-password');
};

exports.getUserById = function (id) {
    return User.findById(id).select('-password');
};

exports.getUserByName = function (name) {
    return User.findOne({name: name});
};

exports.addUser = function (newUser) {
    return newUser.save();
};

exports.updateUser = function (req) {
    return User.update({_id: req.params.id}, req.body);
};

exports.deleteUser = function (req) {
    return User.remove({_id: req.params.id});
};
