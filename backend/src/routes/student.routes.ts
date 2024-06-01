import express from "express"
import { signup } from "../controllers/student/student.controller.js"

const router = express.Router()

// student dashboard
router.route("/dashboard").post((req, res) => {
    res.json({
        message: "Student dashboard"
    })
})

router.route("/signup").post(signup)

export default router 