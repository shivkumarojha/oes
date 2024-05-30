import express from "express";
import { changePassword, loginAdmin, registerAdmin, updateAdmin } from "../controllers/admin/admin.controller.js";
import { addTestCategory, deleteTestCategory, updateTestCategory } from "../controllers/admin/testCategory.controller.js";
import { addTestName, deleteTestName, getAllTest, getSingleTest, setTestVisibility, updateTestName } from "../controllers/admin/testName.controller.js";
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controllers/admin/testQuestion.controller.js";

const router = express.Router()


// Auth routes
router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/updateAdmin/:id").post(updateAdmin)
router.route("/changePassword/:id").post(changePassword)

// Test related routes

router.route("/addTestCategory").post(addTestCategory)
router.route("/updateTestCategory/:testCategoryId").post(updateTestCategory)
router.route("/deleteTestCategory/:testCategoryId").post(deleteTestCategory)

router.route("/addTestName/:testCategoryId").post(addTestName
)


router.route("/updateTestName/:testId").post(updateTestName
)

router.route("/deleteTestName/:testId").post(deleteTestName
)

router.route("/getSingleTest/:testId").post(getSingleTest
)

router.route("/getAllTest/:testCategoryId").post(getAllTest
)

router.route("/setTestVisibility/:testId").post(setTestVisibility
)

// question Related routes
router.route("/addQuestion/:testId").post(addQuestion)

router.route("/updateQuestion/:questionId").post(updateQuestion
)

router.route("/deleteQuestion/:questionId").post(deleteQuestion
)

router.route("/getAllQuestions/:testId").post(getQuestions)


export default router