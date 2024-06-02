import express from "express"
import { signin, signup } from "../controllers/student/student.controller.js"
import studentAuthMiddlreware from "../middlewares/studentAuth.middleware.js"
import { getAllStudentTestCategory, selectTestCategory, showAllCategory } from "../controllers/student/selectCategory.controller.js"

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

// expects object with all selected category
router.route("/selectTestCategory").post(studentAuthMiddlreware, selectTestCategory)


// get all test categories of a particular student
router.route("/getTestCategories").post(studentAuthMiddlreware, getAllStudentTestCategory)
export default router 