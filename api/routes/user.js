const express = require('express')
const userRouter = express.Router()
const { createNewUser } = require('../controllers/userController')
const { validateRequest } = require('../middlewares/validateRequest')
const { body } = require('express-validator')

userRouter.post('/add', 
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('username').not().isEmpty().withMessage('Username is required')
    ],
    validateRequest,
    createNewUser
)



module.exports = userRouter