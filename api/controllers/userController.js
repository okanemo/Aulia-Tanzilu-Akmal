const User = require("../models/userModel")

exports.createNewUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(201).json(user)
    })
}
