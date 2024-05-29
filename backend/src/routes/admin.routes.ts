import express from "express";
import { registerAdmin } from "../controllers/admin/admin.controller.js";

const router = express.Router()


router.route("/register").post(registerAdmin)

export default router