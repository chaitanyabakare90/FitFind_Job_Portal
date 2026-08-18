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
const multer = require("multer");
// Multer is the middleware that allows 
// Express to receive files sent through multipart/form-data.
const { PDFParse } = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai"); //this is Class -> GoogleGenerativeAI
const Jobs = require("./models/job");


connection();

app.use(cors());
app.use(express.json());

//It is middleware that temporalily store the pdf in server memory
const upload = multer({
  storage: multer.memoryStorage() // Configure Multer to temporarily store uploaded files in memory
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 2000
  }
});

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
app.post("/employer/create_jobs", verifyToken, authorizeRoles("employer"), async (req, res) => {
  try {
    const job = req.body;
    const id = req.user.id;
    const newJob = new Job({
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary,
      skills: job.skills,
      createdBy: id
    })
    await newJob.save();
    res.status(200).json({
      message: "Job created successfully",
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Job Creation Failed",
    })
  }

})

// Keep backward compatibility for endpoint typo
app.post("/empolyer/create_jobs", verifyToken, authorizeRoles("employer"), async (req, res) => {
  req.url = "/employer/create_jobs";
  app.handle(req, res);
});

//Fetch Jobs
app.get("/jobs", verifyToken, authorizeRoles("seeker"), async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({
      jobs: jobs
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Apply For Jobs
app.post("/application", verifyToken, authorizeRoles("seeker"), async (req, res) => {
  try {
    const jobId = req.body.jobId || req.body.job_id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required"
      });
    }
    const seekerId = req.user.id;
    const existingApplication = await Application.find({ seeker: seekerId, job: jobId });
    if (existingApplication.length > 0) {
      return res.status(409).json({
        message: "You Have Already Applied for the Job"
      })
    }
    const newApplication = new Application({
      seeker: seekerId,
      job: jobId
    })
    await newApplication.save();
    res.status(200).json({
      message: "Application Submitted successfully",
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//Jobs posted by employee
app.get("/employer/jobs", verifyToken, authorizeRoles("employer"), async (req, res) => {
  try {
    const employerId = req.user.id;
    const jobs = await Job.find({ createdBy: employerId });
    res.status(200).json({
      jobs: jobs
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

//view-Applicants
app.get("/view-applicants/:jobId", verifyToken, authorizeRoles("employer"), async (req, res) => {
  try {
    const { jobId } = req.params;
    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }
    // Make sure this job belongs to the logged-in employer
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to view these applicants"
      });
    }
    // Find applications for this job and get seeker details
    const applicants = await Application.find({
      job: jobId
    }).populate("seeker", "name email");

    res.status(200).json({
      applicants
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
);


//Update status of the application
app.patch("/application/:applicationId", verifyToken, authorizeRoles("employer"), async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { applicationStatus } = req.body;
    const application = await Application.findById({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this application"
      });
    }

    application.status = applicationStatus;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application: application
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
})

//Get Applications of the Seeker

app.get("/applications", verifyToken, authorizeRoles("seeker"), async (req, res) => {
  try {
    const seekerId = req.user.id;

    const applications = await Application.find({
      seeker: seekerId
    }).populate("job", "title company location");
    // console.log(applications);
    res.status(200).json({
      applications: applications
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
})

app.post("/resume_matching", verifyToken, authorizeRoles("seeker"), upload.single("resume"), async (req, res) => {
  try {
    // console.log(req.file.buffer);
    const parser = new PDFParse({
      data: req.file.buffer
    });

    const result = await parser.getText();

    await parser.destroy();

    const prompt = `
      You are a resume skill extraction system.

      Analyze the following resume and extract the technical and professional skills
      that are explicitly mentioned in the resume.

      Return ONLY valid JSON in this exact format:

      {
        "skills": ["skill1", "skill2", "skill3"]
      }

      Rules:
      - Include programming languages, frameworks, libraries, databases, tools,
        technologies, and relevant technical concepts.
      - Do not include the person's name, email, phone number, or other personal information.
      - Do not include education details.
      - Do not include project descriptions.
      - Do not invent skills that are not mentioned in the resume.
      - Avoid duplicate skills.
      - Return only the JSON object, with no explanation or markdown.

      Resume:
      ${result.text}
      `;

    const response = await model.generateContent(prompt);

    const responseText = response.response.text();

    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const skillsData = JSON.parse(cleanedResponse);

    const resumeSkills = skillsData.skills;

    const jobs = await Job.find({});

    const normalizedResumeSkills = resumeSkills.map(skill =>
      skill.toLowerCase().trim()
    );
    const matchedJobs = jobs.map((job) => {

      

      const normalizedJobSkills = job.skills.map(skill =>
        skill.toLowerCase().trim()
      );

      const matchedSkills = normalizedJobSkills.filter(skill =>
        normalizedResumeSkills.includes(skill)
      );

      const matchPercentage =
        (matchedSkills.length / normalizedJobSkills.length) * 100;

      return {
        ...job.toObject(),
        matchPercentage: Math.round(matchPercentage)
      };
    });
    matchedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
    res.status(200).json({
      message: "Resume received successfully",
      jobs: matchedJobs
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
})


app.listen(8080, () => {
  console.log("Server is listening")
})