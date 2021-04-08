'use strict'

const express = require("express")
const bodyParser = require("body-parser")

require("./config/db")

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/routes')
routes(app)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})