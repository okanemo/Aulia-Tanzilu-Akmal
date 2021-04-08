'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController')
    var nab = require('../controllers/nabController')

    app
    .route("/api/v1/user/add")
    .post(user.createNewUser)

    app
    .route("/api/v1/ib/updateTotalBalance")
    .post(nab.updateTotalBalance)

    app
    .route("/api/v1/ib/listNAB")
    .get(nab.listNAB)

}