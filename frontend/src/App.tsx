import { Routes, Route } from "react-router-dom"
import AdminDashobard from "./pages/admin/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashobard />} />
      <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  )
}

export default App
