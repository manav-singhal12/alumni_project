import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const JobSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },

      jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship"], required: true },

      description: { type: String, required: true },

      requirements: { type: [String], required: true },

      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 

      salary:{
        type:String
      },

      applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    },
    { timestamps: true }
  );

  export const Job = mongoose.model("Job",JobSchema)
  