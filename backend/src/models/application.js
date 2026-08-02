const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const applicationModel = new Schema(
    {
        seeker :{
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        job : {
            type : Schema.Types.ObjectId,
            ref :"Job"
        },
        status :{
            type : String,
            default : "pending",
            enum : ["pending","accepted","rejected"]
        },
    },
    {
        timestamps: true
    }
)

const Application = mongoose.model("Application",applicationModel);

module.exports = Application;
