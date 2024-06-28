import express from "express"
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJob } from "../controllers/jobController.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.get("/getall",isAuthenticated, getAllJobs)
router.post("/postjob",isAuthenticated, postJob)
router.get("/getmyjob",isAuthenticated,getMyJobs)
router.put("/updatejob/:id",isAuthenticated,updateJob)
router.delete("/deletejob/:id",isAuthenticated,deleteJob)
router.get("/:id", isAuthenticated, getSingleJob);

export default router