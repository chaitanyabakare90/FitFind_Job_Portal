const mongoose = require("mongoose");

async function connection(){
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }
}

module.exports = connection;