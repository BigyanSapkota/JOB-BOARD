import express from "express"
import { employerGetAllApplication, jobseekerDeleteApplication, jobseekerGetAllApplication, postApplication } from "../controller/applicationController.js"
import {isAuthorized} from "../middleware/auth.js"


const router=express.Router()


router.get("/employer/getall",isAuthorized,employerGetAllApplication)
router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplication)
router.delete("/delete/:id",isAuthorized,jobseekerDeleteApplication)
router.post("/post",isAuthorized,postApplication)


export default router