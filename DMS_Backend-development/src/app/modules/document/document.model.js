import { Schema, model } from "mongoose";

const documentPdfSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    readableLink: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Readable policy link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    downloadableLink: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Downloadable policy link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    department: {
      type: String,
      required: [true, "Department name is required"],
    },
    subDepartment: {
      type: String,
    },
    cloudinaryId: {
      type: String,
      unique: true,
      required: [true, "Cloudinary id is required"],
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

const DocumentPdf = model("DocumentPdf", documentPdfSchema);

export default DocumentPdf;
