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

// Signup Seeker
app.post("/signup/seeker", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "seeker",
    });

    res.status(201).json({
      message: "Seeker account created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

//Signup - Employeer
app.post("/signup/employer", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "employer",
    });

    res.status(201).json({
      message: "Employer account created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

//login 
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