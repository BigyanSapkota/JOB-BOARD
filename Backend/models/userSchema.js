import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name must contain at least 3 character"],
        maxLength:[30,"Name canot exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:[validator.isEmail,"Email is required"],
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:[true,"Password is must required"],
        minLength:[8,"Password must contain at least 8 characters"],
        maxLength:[32,"Password cannot exceed 32 characters"],
        select:false,
    },
    role:{
        type:String,
        requirred:[true,"Please provide your role"],
        enum:["Job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

//password hashing
userSchema.pre("save",async function(next){
    if (!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

//comparing password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// generating a jwt token for authorization
userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User=mongoose.model("User",userSchema)