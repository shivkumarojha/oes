import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    console.log("student router")
    res.status(200).json({
        message: "Student router"
    })
})

export default router 