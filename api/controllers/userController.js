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
    const user = req.body.user_id != undefined ? await getUserByUserId(req, res, page, limit, req.body.user_id) : await getAllUser(req, res, page, limit)
    const nab = await getLastNab(req, res)
    const totalUnit = await getTotalUnit(req, res)
    let currentNab = nab[0].nab
    let users = []

    for (let data of user) {
        const unit = await getUnitByUserId(req, res, data._id)
        let currentUnit = unit[0].unit
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

let getAllUser = async (req, res, page, limit) => {
    const user = await User.find({},'', {skip : page * limit, limit : limit})
    try {
        return user
    } catch (error) {
        res.status(500).send(error)
    }
}

let getUserByUserId = async (req, res, page, limit, user_id) => {
    const user = await User.find({_id: user_id}, '', {skip : page * limit, limit : limit})
    try {
        return user
    } catch (error) {
        res.status(500).send(error)
    }
}

let getLastNab = async (req, res) => {
    const nab = await Nab.find({}, '-_id -__v', {sort: {date: -1}, limit : 1})

    try {
        return nab
    } catch (error) {
        res.status(500).send(error)
    }
}

let getUnitByUserId = async (req, res, user_id) => {
    const unit = await Unit.find({user_id: user_id})
    try {
        return unit
    } catch (error) {
        res.status(500).send(error)
    }
}

let getTotalUnit = async (req, res) => {
    const unit = await Unit.find({})
    try {
        let totalUnit = 0
        for (let data of unit) {
            totalUnit += data.unit
        }
        return totalUnit
    } catch (error) {
        res.status(500).send(error)
    }
}
