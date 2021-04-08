'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController')

    app
    .route("/api/v1/user/add")
    .post(user.createNewUser)

}