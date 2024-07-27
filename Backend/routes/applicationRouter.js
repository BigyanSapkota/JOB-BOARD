import express from "express"
import { employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication } from "../controller/applicationController.js"
import {isAuthorized} from "../middleware/auth.js"


const router=express.Router()


router.get("/employer/getall",isAuthorized,employerGetAllApplications)
router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplications)
router.delete("/delete/:id",isAuthorized,jobseekerDeleteApplication)
router.post("/post",isAuthorized,postApplication)


export default router