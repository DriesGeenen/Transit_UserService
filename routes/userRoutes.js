'use strict';

module.exports = function (app) {
    var UserController = require('../controllers/userController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/users')
        .get(UserController.getAllUsers)
        .post(UserController.addUser);

    app.route('/users/:id')
        .get(UserController.getUserById)
        .delete(UserController.deleteUser)
        .put(UserController.updateUser);

    app.route('/users/withpassword/:email')
        .get(UserController.getUserByEmail);
};