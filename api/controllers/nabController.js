const Unit = require("../models/unitModel")
const Nab = require("../models/nabModel")

exports.updateTotalBalance = (req, res) => {
    Unit.find({}, (err, unit) => {
        if (err) {
            res.status(500).send(err)
        }
        let total = 0;

        for (let data of unit) {
            total += data.unit
        }
        
        const nab = total == 0 ? 1 : (Math.floor(req.body.current_balance / total * 10000) / 10000)
        let newNAB = new Nab({nab: nab})
        newNAB.save((err_nab, nabData) => {
            if (err_nab) {
                res.status(500).send(err_nab)
            } 
            res.status(200).json(nabData.nab);
        })
    })
}

exports.listNAB = (req, res) => {
    Nab.find({}, '-_id -__v', {sort: {date: -1}} , (err, nab) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(nab)
    })
}