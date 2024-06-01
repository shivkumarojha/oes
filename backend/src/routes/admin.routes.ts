import express from "express";
import { changeAdminPassword, loginAdmin, registerAdmin, updateAdmin } from "../controllers/admin/admin.controller.js";
import { addTestCategory, deleteTestCategory, getAllTestCategories, updateTestCategory } from "../controllers/admin/testCategory.controller.js";
import { addTestName, deleteTestName, getAllTest, getSingleTest, setTestVisibility, updateTestName } from "../controllers/admin/testName.controller.js";
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controllers/admin/testQuestion.controller.js";
import { validateAdminSchema } from "../middlewares/validateAdminSchema.middleware.js";
import { hashPasswordMiddleware } from "../middlewares/hashPassword.middleware.js";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware.js";
const router = express.Router()


// Auth routes
router.route("/register").post(validateAdminSchema, hashPasswordMiddleware, registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/updateAdmin").post(adminAuthMiddleware, updateAdmin)
router.route("/changePassword").post(adminAuthMiddleware, changeAdminPassword)

// Test related routes

router.route("/addTestCategory").post(adminAuthMiddleware, addTestCategory)
router.route("/updateTestCategory/:id").post(adminAuthMiddleware, updateTestCategory)
router.route("/deleteTestCategory/:id").post(adminAuthMiddleware, deleteTestCategory)
router.route("/getTestCategories").post(adminAuthMiddleware, getAllTestCategories)

// Test Name related
router.route("/addTestName/:testCategoryId").post(adminAuthMiddleware,addTestName
)
router.route("/updateTestName/:testId").post(adminAuthMiddleware, updateTestName
)

router.route("/deleteTestName/:testId").post(adminAuthMiddleware, deleteTestName
)

router.route("/getSingleTest/:testId").post(adminAuthMiddleware, getSingleTest
)

router.route("/getAllTest/:testCategoryId").post(adminAuthMiddleware, getAllTest
)

router.route("/setTestVisibility/:testId").post(adminAuthMiddleware, setTestVisibility
)

// question Related routes
router.route("/addQuestion/:testId").post(addQuestion)

router.route("/updateQuestion/:questionId").post(updateQuestion
)

router.route("/deleteQuestion/:questionId").post(deleteQuestion
)

router.route("/getAllQuestions/:testId").post(getQuestions)


export default router