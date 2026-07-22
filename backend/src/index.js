require("dotenv").config();

const express = require("express");
const app = express();
const connection = require("./config/dbconfig")

connection();

app.listen(8080,() => {
    console.log("Server is listening")
})