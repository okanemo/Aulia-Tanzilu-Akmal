const User = require("../models/userModel")
const Unit = require("../models/unitModel")
const Nab = require("../models/nabModel")

exports.createNewUser = async (req, res) => {
  
    const user = new User(req.body);
    try {
        await user.save()
    } catch (error) {
        res.status(500).send(error)
    }

    let unit = new Unit({user_id: user._id, unit: 0})

    try {
        await unit.save()
    } catch (error) {
        res.status(500).send(error)
    }
   
    res.status(200).json(user)
}

exports.member = async (req, res) => {
    const page = req.body.page != undefined ? req.body.page : 0;
    const limit = req.body.limit != undefined ? req.body.limit : 20;
    let user, nab, unit, userUnit
    let totalUnit = 0

    try {
        user = req.body.user_id != undefined ? await User.find({_id: req.body.user_id}, '', {skip : page * limit, limit : limit}) : await User.find({},'', {skip : page * limit, limit : limit})
    } catch (error) {
        res.status(500).send(error)
    }

    try {
        nab = await Nab.find({}, '-_id -__v', {sort: {date: -1}, limit : 1})
    } catch (error) {
        res.status(500).send(error)
    }

    try {
        unit = await Unit.find({})
        for (let data of unit) {
            totalUnit += data.unit
        }
    } catch (error) {
        res.status(500).send(error)
    }

    let currentNab = nab[0] == undefined ? 1 : nab[0].nab
    let users = []

    for (let data of user) {

        try {
            userUnit = await Unit.find({user_id: data._id})
        } catch (error) {
            res.status(500).send(error)
        }

        let currentUnit = userUnit[0].unit
        let temp = {
            user_id : data._id,
            name : data.name,
            username : data.username,
            total_unit : currentUnit,
            rupiah : Math.floor(currentUnit * currentNab * 100) / 100
        }
        users.push(temp)
    }

    let output = {
        page : page,
        limit : limit,
        total_amount : totalUnit,
        users : users
    }

    res.status(200).json(output)
}
