const User = require("../models/userModel")
const Unit = require("../models/unitModel")

exports.createNewUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        let newUnit = new Unit({user_id: user._id, unit: 0})
        newUnit.save((err_unit, unit) => {
            if (err_unit) {
                res.status(500).send(err_unit)
            }
            res.status(200).json(user)
        })
    })
}
