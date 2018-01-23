'use strict';

module.exports = function (app) {
    var UserController = require('../controllers/userController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/users/current')
        .get(AuthHelper.loginRequired, UserController.getProfile);

    app.route('/users')
        .get(UserController.getAllUsers);

    app.route('/users/:id')
        .get(UserController.getUserById)
        .delete(UserController.deleteUser)
        .put(UserController.updateUser);

    app.route('/users/register')
        .post(UserController.registerUser);

    app.route('/users/authenticate')
        .post(UserController.authenticateUser);
};