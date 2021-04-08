'use strict';

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const historySchema = new Schema({
    user_id: {
        type:String,
        required:true
    },
    amount_unit: {
        type:Number,
        required:true
    },
    current_unit: {
        type:Number,
        required:true
    },
    createdOn: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("historyModel", historySchema);