import { Schema, model } from "mongoose";
import { category, department } from "./knowledge.constant.js";

const knowledgePdfSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    pdfLink: {
      type: String,
      trim: true,
      unique: true,
    //   required: [true, "Readable policy link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    videoLink: {
      type: String,
      trim: true,
      unique: true,
    //   required: [true, "Downloadable policy link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    department: {
      type: String,
      enum: {
        values: department,
        message: "{VALUE} is not matched",
      },
      required: [true, "Department name is required"],
    },
    category: {
      type: String,
      enum: {
        values: category,
        message: "{VALUE} is not matched",
      },
      required: [true, "Department name is required"],
    },
    cloudinaryPdfId: {
      type: String,
      unique: true,
      // required: [true, "Cloudinary pdf id is required"],
    },
    cloudinaryVideoId: {
      type: String,
      unique: true,
      // required: [true, "Cloudinary video id is required"],
    },
    uploadBy: {
      type: String,
      required: [true, "Employee id is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const KnowledgePdf = model("KnowledgePdf", knowledgePdfSchema);

export default KnowledgePdf;
