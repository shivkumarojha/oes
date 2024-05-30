import 'module-alias/register.js'
import express from "express"
import 'dotenv/config'

const app = express()

// for parsing body
app.use(express.json())
// admin router
import adminRouter from "./routes/admin.routes.js"
app.use('/api/v1/admin', adminRouter)


// Student Router
import studentRouter from "./routes/student.routes.js"
app.use("/api/v1/student", studentRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running at port ", process.env.PORT)
})