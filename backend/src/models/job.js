const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    location :{
        type : String,
        required : true
    },
    salary :{
        type : Number,
        required : true
    },
    skills : {
        type : [String]
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

const Jobs = mongoose.model("Job",jobSchema);
module.exports = Jobs;