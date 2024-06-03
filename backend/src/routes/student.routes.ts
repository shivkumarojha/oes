import express from "express"
import { signin, signup } from "../controllers/student/student.controller.js"
import studentAuthMiddlreware from "../middlewares/studentAuth.middleware.js"
import { getAllStudentTestCategory, selectTestCategory, showAllCategory } from "../controllers/student/selectCategory.controller.js"
import { enrollForFreeTest, getStudentBuyiedTest, getTestByCategory, verifyPurchase } from "../controllers/student/studentTests.controller.js"
import { verify } from "crypto"
import test from "node:test"
import { getQuestionPaper } from "../controllers/student/questionPaper.controller.js"

const router = express.Router()

// student dashboard
router.route("/me").get(studentAuthMiddlreware, (req, res) => {
    const student = req?.user
    if (!student) {
        return res.send(false)
    }
    return res.status(200).json({
        message: "Student dashboard",
        student: student
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


// Question paper related routes
router.route("/getQuestionPaper/:testId").post(studentAuthMiddlreware, getQuestionPaper)
export default router 