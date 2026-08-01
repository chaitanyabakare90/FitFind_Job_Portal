import {Route, Routes } from "react-router-dom"
import EmployeerSignUp from "./pages/Employer_Pages/EmployeerSignUp"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SeekerSignUp from "./pages/Seeker_Pages/SeekerSignUp"
import EmpolyerDashboard from "./pages/Employer_Pages/EmpolyerDashboard"
import SeekerDashboard from "./pages/Seeker_Pages/SeekerDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateJob from "./pages/Employer_Pages/CreateJob"
import GetJobs from "./pages/Seeker_Pages/GetJobs"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage /> }> </Route>
        <Route path="/signup/seeker" element={<SeekerSignUp/>}>  </Route>
        <Route path="/signup/employeer" element={<EmployeerSignUp/>}> </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/employer/dashboard" element={<ProtectedRoute role="employer"><EmpolyerDashboard/> </ProtectedRoute>}></Route>
        <Route path="/seeker/dashboard" element={<ProtectedRoute role="seeker"><SeekerDashboard/> </ProtectedRoute>}></Route>
        <Route path="/employer/jobs" element={<CreateJob></CreateJob>}></Route>
        <Route path="/seeker/jobs" element={<GetJobs></GetJobs>}></Route>
      </Routes>
    </>
  )
}

export default App
