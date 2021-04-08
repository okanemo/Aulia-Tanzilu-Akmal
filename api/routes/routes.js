'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController')
    var nab = require('../controllers/nabController')
    var unit = require('../controllers/unitController')

    app
    .route("/api/v1/user/add")
    .post(user.createNewUser)

    app
    .route("/api/v1/ib/updateTotalBalance")
    .post(nab.updateTotalBalance)

    app
    .route("/api/v1/ib/listNAB")
    .get(nab.listNAB)

    app
    .route("/api/v1/ib/topup")
    .post(unit.topUp)

    app
    .route("/api/v1/ib/withdraw")
    .post(unit.withdraw)

}