import express from "express";

const router = express.Router()


router.get('/', (req, res) => {
    console.log("admin route")
    res.status(200).json({
        message: "Admin router"
    })
})
export default router