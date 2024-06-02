import express from "express"
import { signin, signup } from "../controllers/student/student.controller.js"
import studentAuthMiddlreware from "../middlewares/studentAuth.middleware.js"
import { selectCategory, showAllCategory } from "../controllers/student/selectCategory.controller.js"

const router = express.Router()

// student dashboard
router.route("/dashboard").post((req, res) => {
    res.json({
        message: "Student dashboard"
    })
})

router.route("/signup").post(signup)
router.route('/signin').post(signin)

// Student  category related routes
router.route("/showAllCategory").post(studentAuthMiddlreware, showAllCategory)

router.route("/selectCategory").post(studentAuthMiddlreware, selectCategory)

export default router 