import React from "react"
import ReactDOM from "react-dom/client"
import { Route } from "react-router-dom"
import "./index.css"
import App from "./App"

import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import AdminDashobard from "./pages/admin/AdminDashboard.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route  path="/admin" element={<AdminDashobard />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
