const Unit = require("../models/unitModel")
const Nab = require("../models/nabModel")
const History = require("../models/historyModel")

exports.topup = async (req, res) => {
    await transaction(req, res, "topup")
}

exports.withdraw = async (req, res) => {
    await transaction(req, res, "withdraw")
}


let transaction = async (req, res, type) => {
    let unit, nab, output
    
    try {
        unit = await Unit.find({user_id: req.body.user_id})
    } catch (error) {
        res.status(500).send(error)
    }

    try {
        nab = await Nab.find({}, '-_id -__v', {sort: {date: -1}, limit : 1})
    } catch (error) {
        res.status(500).send(error)
        
    }

    let previousUnit = unit[0].unit; 
    let currentNab = nab[0].nab
    let amountUnit = Math.floor(req.body.amount_rupiah / currentNab * 10000) / 10000

    if (type == "withdraw" && previousUnit < amountUnit) {
        res.status(500).send({message: "Unit yang diambil melebihi dari unit yang dimiliki"})
    }

    let currentUnit = type == "topup" ? (previousUnit + amountUnit) : (previousUnit - amountUnit)
    let currentBalance = Math.floor(currentUnit * currentNab * 100) / 100

    let history = new History({
        user_id: req.body.user_id,
        type: type,
        amount_unit: amountUnit,
        current_unit: currentUnit
    })

    try {
        await history.save()
    } catch (error) {
        res.status(500).send(error)
    }

    try {
        await Unit.findOneAndUpdate({user_id: req.body.user_id}, {unit: currentUnit})
    } catch (error) {
        await History.deleteOne({_id: history._id });
        res.status(500).send(error)
    }
    
    if (type == "topup") {
        output = {
            nilai_unit_hasil_topup: amountUnit,
            nilai_unit_total: currentUnit,
            saldo_rupiah_total: currentBalance
        }
    } else {
        output = {
            nilai_unit_setelah_withdraw: amountUnit,
            nilai_unit_total: currentUnit,
            saldo_rupiah_total: currentBalance
        }
    }
    res.status(200).json(output)

}

