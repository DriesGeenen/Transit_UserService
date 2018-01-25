'use strict';

module.exports = function (app) {
    var UserController = require('../controllers/userController');
    var AuthHelper = require('../helpers/authHelper');

    //app.route('/users')
    //    .get(AuthHelper.adminRequired, UserController.getAllUsers)
    //    .post(AuthHelper.authServiceRequired, UserController.addUser);

    /*app.route('/users/profile')
        .get(UserController.getProfile);*/

    //app.route('/users/:id')
    //    .get(AuthHelper.adminOrSelfRequired, UserController.getUserById)
    //    .delete(AuthHelper.adminOrSelfRequired, UserController.deleteUser)
    //    .put(AuthHelper.authServiceRequired, UserController.updateUser);

    //app.route('/users/withpassword/:email')
    //    .get(AuthHelper.authServiceRequired, UserController.getUserByEmail);


    app.route('/users')
        .get(UserController.getAllUsers)
        .post(UserController.addUser);

    /*app.route('/users/profile')
        .get(UserController.getProfile);*/

    app.route('/users/:id')
        .get(UserController.getUserById)
        .delete(UserController.deleteUser)
        .put(UserController.updateUser);

    app.route('/users/withpassword/:email')
        .get(UserController.getUserByEmail);
};