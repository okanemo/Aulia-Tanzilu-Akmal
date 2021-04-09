'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const userRouter = require("./api/routes/user")
const ibRouter = require("./api/routes/ib")


require("./config/db")

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/user', userRouter)

app.use('/api/v1/ib', ibRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})