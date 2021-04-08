'use strict';

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    createdOn: {
        type:Date,
        default:Date.now
    }
})

    
module.exports = mongoose.model("userModel", UserSchema);