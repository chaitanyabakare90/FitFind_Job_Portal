import {Route, Routes } from "react-router-dom"
import EmployeerSignUp from "./pages/EmployeerSignUp"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SeekerSignUp from "./pages/SeekerSignUp"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage /> }> </Route>
        <Route path="/signup/seeker" element={<SeekerSignUp/>}>  </Route>
        <Route path="/signup/employeer" element={<EmployeerSignUp/>}> </Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
