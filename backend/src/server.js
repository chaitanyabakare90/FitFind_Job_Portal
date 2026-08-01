require("dotenv").config();

const express = require("express");
const app = express();
const connection = require("./config/dbconfig");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const authorizeRoles = require("./middleware/authorizeRoles");
const cors = require("cors");
const Job = require("./models/job");
const Application = require("./models/application");

connection();

app.use(cors());
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
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
      role: "seeker",
    });
    await user.save();
    const jwttoken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )
    res.status(201).json({
      message: "Seeker account created successfully",
      token: jwttoken,
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
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
      role: "employer",
    });
    await user.save();
    const jwttoken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )
    res.status(201).json({
      message: "Employer account created successfully",
      token: jwttoken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

//login 
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Email Does Not Exist"
      })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch === false) {
      return res.status(401).json({
        message: "Wrong Password"
      })
    }
    const jwttoken = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Job Creation
app.post("/jobs",verifyToken,authorizeRoles("employer"), async (req,res) =>{
  try{
    const job = req.body;
    const id = req.user.id;
    const newJob = new Job({
      title : job.title,
      company : job.company,
      description : job.description,
      location : job.location,
      salary : job.salary,
      skills : job.skills,
      createdBy : id
    })
    await newJob.save();
    res.status(200).json({
      message : "Job created successfully",
    })

  }catch(err){
    console.error(err);
    res.status(500).json({
      message: "Job Creation Failed",
    })
  }
  
})
//Fetch Jobs
app.get("/jobs",verifyToken,authorizeRoles("seeker"),async(req,res) =>{
    try{
      const jobs = await Job.find({});
      res.status(200).json({
         jobs : jobs
      })
    }catch(err){
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
})

//Apply For Jobs
app.post("/application",verifyToken,authorizeRoles("seeker"), async(req,res) =>{
    try {
      const {jobId} = req.body;
      const seekerId = req.user.id;
      const existingApplication = await Application.find({seeker : seekerId, job : jobId});
      if(existingApplication.length > 0){
        return res.status(409).json({
          message : "You Have Already Applied for the Job"
        })
      } 
      const newApplication = new Application({
        seeker : seekerId,
        job : jobId
      })
      await newApplication.save();
      res.status(200).json({
      message : "Application Submitted successfully",
    })
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