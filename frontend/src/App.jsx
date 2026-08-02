import { Route, Routes } from "react-router-dom"
import EmployeerSignUp from "./pages/Employer_Pages/EmployeerSignUp"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SeekerSignUp from "./pages/Seeker_Pages/SeekerSignUp"
import EmpolyerDashboard from "./pages/Employer_Pages/EmpolyerDashboard"
import SeekerDashboard from "./pages/Seeker_Pages/SeekerDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateJob from "./pages/Employer_Pages/CreateJob"
import GetJobs from "./pages/Seeker_Pages/GetJobs"
import EmployerJobs from "./pages/Employer_Pages/EmployerJobs"

function App() {
  return (
    <>
      <Routes>
        {/* ── Public routes ──────────────────────────────── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/seeker" element={<SeekerSignUp />} />
        <Route path="/signup/employeer" element={<EmployeerSignUp />} />
        <Route path="/login" element={<Login />} />

        {/* ── Employer routes (protected) ─────────────────── */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute role="employer">
              <EmpolyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/create_jobs"
          element={
            <ProtectedRoute role="employer">
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute role="employer">
              <EmployerJobs />
            </ProtectedRoute>
          }
        />

        {/* ── Seeker routes (protected) ───────────────────── */}
        <Route
          path="/seeker/dashboard"
          element={
            <ProtectedRoute role="seeker">
              <SeekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seeker/jobs"
          element={
            <ProtectedRoute role="seeker">
              <GetJobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
