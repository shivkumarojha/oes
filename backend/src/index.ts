import 'module-alias/register.js'
import express from "express"
import 'dotenv/config'
import cors from 'cors'
const app = express()

// for parsing body
app.use(express.json())

//for cors
app.use(cors())
// admin router
import adminRouter from "./routes/admin.routes.js"
app.use('/api/v1/admin', adminRouter)


// Student Router
import studentRouter from "./routes/student.routes.js"
app.use("/api/v1/student", studentRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running at port ", process.env.PORT)
})