import express from "express"
import { deleteP, getAll, postProperty, update } from "../controllers/PropertyControllers.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.get("/getall", getAll)
router.post("/postProperty",postProperty)

router.put("/update/:id",update)
router.delete("/delete/:id",deleteP)


export default router