import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "must contain at least 3 characters"],
    maxLength: [30, "Cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validator: [validator.isEmail, "please provide valid email"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide cover letter"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone-number"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
},
    applicantID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type:String,
        enum:["Job Seeker"],
        required:true
      }
    },
    employerID:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          role: {
            type:String,
            enum:["Employer"],
            required:true
          }
    }
});
export const Application = mongoose.model("Application",applicationSchema)
