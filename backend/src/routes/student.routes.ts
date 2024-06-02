import express from "express"
import { signin, signup } from "../controllers/student/student.controller.js"

const router = express.Router()

// student dashboard
router.route("/dashboard").post((req, res) => {
    res.json({
        message: "Student dashboard"
    })
})

router.route("/signup").post(signup)
router.route('/signin').post(signin)

export default router 