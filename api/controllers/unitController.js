const Unit = require("../models/unitModel")
const Nab = require("../models/nabModel")
const History = require("../models/historyModel")

const transaction = function (req, res, type) {
    Unit.find({user_id : req.body.user_id}, (err, unit) => {
        if (err) {
            res.status(500).send(err)
        }
       
        let previousUnit = unit[0].unit; 
        Nab.find({}, '-_id -__v', {sort: {date: -1}, limit : 1} , (err_nab, nab) => {
            if (err_nab) {
                res.status(500).send(err_nab)
            }
            
            let currentNab = nab[0].nab
            let amountUnit = Math.floor(req.body.amount_rupiah / currentNab * 10000) / 10000;
            let currentUnit = type == "topup" ? (previousUnit + amountUnit) : (previousUnit - amountUnit)
            let currentBalance = Math.floor(currentUnit * currentNab * 100) / 100

            let history = new History({
                user_id: req.body.user_id,
                amount_unit: amountUnit,
                current_unit: currentUnit
            })

            history.save((err_history, history) => {
                if (err_history) {
                    res.status(500).send(err_history)
                }
                Unit.findOneAndUpdate({user_id: req.body.user_id}, {unit: currentUnit}, (err_unit, unitData) => {
                    if (err_unit) {
                        res.status(500).send(err_unit)
                    }
                    let output = {
                        nilai_unit_hasil_topup: amountUnit,
                        nilai_unit_total: currentUnit,
                        saldo_rupiah_total: currentBalance
                    }
                    res.status(200).json(output)
                })
            })
        })
    })
}

exports.topUp = (req, res) => {
    transaction(req, res, "topup")
}

exports.withdraw = (req, res) => {
    transaction(req, res, "withdraw")
}