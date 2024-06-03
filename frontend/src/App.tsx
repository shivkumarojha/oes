import { useEffect } from "react"
import "./App.css"
import HomePage from "./pages/HomePage"
import axios from "axios"

function App() {
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/student/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }).then((res) => {
      console.log(res.data)
    })
  }, [])
  return <HomePage />
}

export default App
