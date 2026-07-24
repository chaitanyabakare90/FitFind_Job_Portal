const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 50
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength: 4
    },
    
    role : {
        type : String,
        enum: ['seeker', 'employer', 'admin'],
        default : "seeker", 
        required: true
    }
},
{
    timestamps : true
}

)

const User = mongoose.model("User",userSchema);

module.exports = User;