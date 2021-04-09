const Unit = require("../models/unitModel")
const Nab = require("../models/nabModel")

exports.updateTotalBalance = async (req, res) => {
    let unit
    let totalUnit = 0

    try {
        unit = await Unit.find({})
        for (let data of unit) {
            totalUnit += data.unit
        }
    } catch (error) {
        res.status(500).send(error)
    }

    console.log(totalUnit)

    const nab = totalUnit == 0 ? 1 : (Math.floor(req.body.current_balance / totalUnit * 10000) / 10000)
    const newNAB = new Nab({nab: nab})
    try {
        await newNAB.save()
    } catch (error) {
        res.status(500).send(error)
    }

    res.status(200).json(newNAB.nab);
}

exports.listNAB = async (req, res) => {
    let nab
    try {
        nab = await Nab.find({}, '-_id -__v', {sort: {date: -1}})
    } catch (error) {
        res.status(500).send(error)
    }

    res.status(200).json(nab)
}

