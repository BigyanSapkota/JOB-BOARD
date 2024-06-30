import mongoose from "mongoose";



const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Job title is required"],
        minLength:[2,"Job title must contain at least 2 character"],
        maxLength:[70,"JOb title canot exceed 30 character"],
      },
      description:{
        type:String,
        require:[true,"Job descriptions is required"],
        minLength:[10,"must contain at least 10 characters"],
        maxLength:[500,"Description can not exceeds 500 characters"],
      },
      category:{
        type:String,
        required:[true,"Job category is required"],
      },
      country:{
        type:String,
        required:[true,"Country is required"]
      },
      city:{
        type:String,
        required:[true,"City is required"],
      },
      location:{
        type:String,
        required:[true,"location is required"],
      },
      fixedSalary:{
        type:Number,
      },
      salaryFrom:{
        type:Number,
      },
      salaryTo:{
        type:Number,
      },
      expired:{
        type:Boolean,
        default:false,
      },
      jobPostedOn:{
        type:Date,
        default:Date.now(),
      },
      postedBy:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
      },
})

export const Job = mongoose.model("Job",jobSchema)