'use strict';

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    user_id: {
        type:String,
        required:true
    },
    unit: {
        type:Number,
        required:true,
    },
    createdOn: {
        type:Date,
        default:Date.now
    }
})

    
module.exports = mongoose.model("unitModel", UnitSchema);