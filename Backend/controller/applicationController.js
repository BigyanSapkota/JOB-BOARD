import {catchAsyncError} from "../middleware/catchAsyncError.js"
import ErrorHandler from "../middleware/error.js"
import {Application} from "../models/applicationSchema.js"
import {Job} from "../models/jobSchema.js"
import cloudinary from "cloudinary"



export const postApplication = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if (role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access"))
    }
    

    if(!req.files || Object.keys(req.files).length === 0){
           return next(new ErrorHandler("Resume is required"))
    }
    const {resume}= req.files
    const allowedFormats = ["image/png","image/jpeg","image/webp","image/jpg","application/pdf"]
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file format. Use png or jpg or webp format"))
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath,{
        resource_type:'auto'
    })
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown cloudinary Error"
        )
        return next(new ErrorHandler("Failed to upload resume"))
    }



    const {name,email,coverLetter,phone,address,jobId} = req.body
    const applicantID = {
        user:req.user._id,
        role:"Job Seeker"
    }
    if (!jobId){
        return next(new ErrorHandler("Job not found"))
    }
    const jobDetails = await Job.findById(jobId)
    if(!jobDetails){
        return next(new ErrorHandler("Job not found"))          
    }
    const employerID={
        user:jobDetails.postedBy,
        role:"Employer"
    }
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("Please fill all field",400))
    }


    // const missingFields = [];
    // if (!name) missingFields.push("name");
    // if (!email) missingFields.push("email");
    // if (!coverLetter) missingFields.push("coverLetter");
    // if (!phone) missingFields.push("phone");
    // if (!address) missingFields.push("address");
    // if (!resume) missingFields.push("resume");

    // if (missingFields.length > 0) {
    //     return next(new ErrorHandler(`Please fill all fields: ${missingFields.join(", ")}`, 400));
    // }

    const application  = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success:true,
        message:"Application Submitted",
        application,
    })
})






export const employerGetAllApplications = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user 
    if (role == "Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access",400))
    }
    const {_id}=req.user
    const applications = await Application.find({"employerID.user":_id})
    res.status(200).json({
        success:true,
        applications
    })
})




export const jobseekerGetAllApplications = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user 
    if (role === "Employer"){
        return next (new ErrorHandler("Employer is not allowed to access",400))
    }
    const {_id}=req.user
    const applications = await Application.find({"applicantID.user":_id})
    res.status(200).json({
        success:true,
        applications
    })
})


export const jobseekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user 
    if (role == "Employer"){
        return next (new ErrorHandler("Employer is not allowed to access",400))
    }
    const {id} = req.params
    const application = await Application.findById(id)
    if(!application){
        return next(new ErrorHandler("Application not found",404))
    }
    await application.deleteOne()
    res.status(200).json({
        success:true,
        message:"Application Deleted Successfully"
    })
})



