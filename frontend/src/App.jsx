import {Route, Routes } from "react-router-dom"
import EmployeerSignUp from "./pages/EmployeerSignUp"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SeekerSignUp from "./pages/SeekerSignUp"
import EmpolyerDashboard from "./pages/EmpolyerDashboard"
import SeekerDashboard from "./pages/SeekerDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateJob from "./pages/CreateJob"

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
        <Route path="/jobs" element={<CreateJob></CreateJob>}></Route>
      </Routes>
    </>
  )
}

export default App
