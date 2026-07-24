require("dotenv").config();

const express = require("express");
const app = express();
const connection = require("./config/dbconfig");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
connection();

app.use(express.json());


//signup
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
            // role will automatically be "seeker"
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.post("/login", async (req, res) => {
     try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message : "Email Does Not Exist"
            })
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(isMatch === false){
            return res.status(401).json({
                message : "Wrong Password"
            })
        } 
        const jwttoken = jwt.sign(
            {
                id : existingUser._id,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "7d"
            }
        )
        res.status(200).json({
            message: "Login Successful",
            token: jwttoken,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})














app.listen(8080, () => {
    console.log("Server is listening")
})