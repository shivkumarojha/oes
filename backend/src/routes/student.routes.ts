import express from "express"
import { signin, signup } from "../controllers/student/student.controller.js"
import studentAuthMiddlreware from "../middlewares/studentAuth.middleware.js"
import { getAllStudentTestCategory, selectTestCategory, showAllCategory } from "../controllers/student/selectCategory.controller.js"
import { enrollForFreeTest, getStudentBuyiedTest, getTestByCategory, verifyPurchase } from "../controllers/student/studentTests.controller.js"
import { verify } from "crypto"

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

// get all the test related to the category
router.route("/getTestByCategory/:testCategoryId").post(studentAuthMiddlreware, getTestByCategory)

router.route("/enrollForFreeTest/:testId").post(studentAuthMiddlreware, enrollForFreeTest)


// show buying test for student
router.route("/getStudentBuyiedTest").post(studentAuthMiddlreware, getStudentBuyiedTest)

// Verify purchase 
router.route("/verifyPurchase").post(studentAuthMiddlreware, verifyPurchase)
export default router 