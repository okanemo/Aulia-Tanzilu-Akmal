'use strict';

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const NabSchema = new Schema({
    nab: {
        type:Number,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("nabModel", NabSchema);