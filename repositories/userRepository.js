'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getAllUsers = function () {
    return User.find({}).select('-password');
};

exports.getUserById = function (id) {
    return User.findById(id).select('-password');
};

exports.getUserByEmail = function (email) {
    return User.findOne({email: email});
};

exports.addUser = function (newUser) {
    return newUser.save();
};

exports.updateUser = function (id, user) {
    return User.update({_id: id}, user);
};

exports.deleteUser = function (id) {
    return User.remove({_id: id});
};
