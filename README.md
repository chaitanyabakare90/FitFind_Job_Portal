# 🎯 FitFind – Modern Job Portal

> **Where Talent Meets Opportunity**

> [!IMPORTANT]
> 🚧 **PROJECT STATUS: UNDER DEVELOPMENT** 🚧  
> FitFind is currently under active development. Core authentication, job posting, job browsing, and application features are implemented, while advanced features (e.g. application management, user profiles, status tracking) are actively being expanded.

---

## 📌 Overview

**FitFind** is a full-stack job portal connecting job seekers with employers. It provides role-based authentication and separate dashboards for employers to post and manage jobs, and job seekers to browse open positions and apply seamlessly.

### ✨ Key Features

#### 🏢 For Employers
- **Company Registration & Authentication**: Secure sign-up and login as an Employer.
- **Employer Dashboard**: Overview of posted jobs, quick action cards, and hiring metrics.
- **Post New Jobs**: Detailed form to publish job openings with title, company, location, salary, description, and required skills.
- **Manage Job Listings**: View all posted jobs and track applicant engagement.

#### 💼 For Job Seekers
- **Seeker Registration & Authentication**: Fast sign-up and login as a Job Seeker.
- **Seeker Dashboard**: Overview of available job metrics and quick access navigation.
- **Browse Job Openings**: Explore active job opportunities across various locations and tech stacks.
- **One-Click Application**: Apply directly to job listings with automated duplicate application prevention.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework/Tooling**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (Custom Design System with CSS variables, Glassmorphism, and responsive layout)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt password hashing
- **Middleware**: Custom Auth (`verifyToken`), Role Authorization (`authorizeRoles`), CORS

---

## 🚀 How to Run Locally

Follow these steps to run **FitFind** on your local machine.

### 📋 Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher) – [Download Node.js](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- **MongoDB Atlas** database account or a local MongoDB instance.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chaitanyabakare90/FitFind_Job_Portal.git
cd FitFind
```

---

### 2️⃣ Backend Setup & Execution

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` root directory:
   ```env
   ATLAS_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   > 💡 Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI, and `your_jwt_secret_key` with any strong random string.

4. Start the backend server:
   ```bash
   # Development mode with nodemon
   npx nodemon src/server.js

   # OR Standard node execution
   node src/server.js
   ```

   The backend server will start listening on **`http://localhost:8080`**.

---

### 3️⃣ Frontend Setup & Execution

1. Open a new terminal window/tab and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically **`http://localhost:5173`**).

---

## 📂 Project Structure

```
FitFind/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── dbconfig.js       # MongoDB database connection
│   │   ├── middleware/
│   │   │   ├── authorizeRoles.js # Role-based access control middleware
│   │   │   └── verifyToken.js    # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── application.js    # Job Application schema
│   │   │   ├── job.js            # Job posting schema
│   │   │   └── user.js           # User schema (Seeker/Employer)
│   │   └── server.js             # Main Express server & API routes
│   ├── .env                      # Environment variables (Git-ignored)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg           # Custom FitFind browser favicon
│   ├── src/
│   │   ├── assets/               # Hero illustrations and static media
│   │   ├── components/
│   │   │   ├── EmployerSidebar.jsx
│   │   │   ├── SeekerSidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Employer_Pages/   # Employer Dashboard, CreateJob, EmployerJobs
│   │   │   ├── Seeker_Pages/     # Seeker Dashboard, GetJobs, SeekerSignUp
│   │   │   ├── LandingPage.jsx
│   │   │   └── Login.jsx
│   │   ├── styles/               # CSS modules & shared dashboard styling
│   │   ├── App.jsx               # React Router navigation & route protection
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Global CSS design tokens
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 📜 License & Note

This project is currently **under active development**. Features and APIs are continuously updated. Feel free to report issues or suggest enhancements!
