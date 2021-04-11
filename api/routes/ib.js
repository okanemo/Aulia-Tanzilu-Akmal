const express = require('express')
const ibRouter = express.Router()
const { updateTotalBalance, listNAB } = require('../controllers/nabController')
const { topup, withdraw } = require('../controllers/unitController')
const { member } = require('../controllers/userController')
const { validateRequest } = require('../middlewares/validateRequest')
const { body } = require('express-validator')
const { history } = require('../controllers/historyController')

ibRouter.post('/updateTotalBalance', 
    [
        body('current_balance').not().isEmpty().withMessage('Current Balance is required')
    ],
    validateRequest,
    updateTotalBalance
)

ibRouter.get('/listNAB', listNAB)

ibRouter.post('/topup', 
    [
        body('user_id').not().isEmpty().withMessage('User Id is required'),
        body('amount_rupiah').not().isEmpty().withMessage('Amount Rupiah is required')
    ],
    validateRequest,
    topup
)

ibRouter.post('/withdraw', 
    [
        body('user_id').not().isEmpty().withMessage('User Id is required'),
        body('amount_rupiah').not().isEmpty().withMessage('Amount Rupiah is required')
    ],
    validateRequest,
    withdraw
)

ibRouter.get('/member', 
    member
)

ibRouter.get('/history', 
    [
        body('user_id').not().isEmpty().withMessage('User Id is required')
    ],
    validateRequest,
    history
)

module.exports = ibRouter