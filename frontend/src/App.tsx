import { useEffect } from "react"
import "./App.css"
import { useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import axios from "axios"

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.student.id)
        if (res.data) {
          navigate("/student")
        }
      })
  }, [])

  return <HomePage />
}

export default App
