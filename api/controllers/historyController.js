const History = require('../models/historyModel')

exports.history = async (req, res) => {
    let history

    try {
        history = await History.find({user_id : req.body.user_id}, '-__v', {sort: {date: -1}})
    } catch (error) {
        res.status(500).send(error)
    }

    res.status(200).json(history)
}