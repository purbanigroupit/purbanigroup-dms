import { Schema, model } from "mongoose";

const noticePdfSchema = Schema(
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
      required: [true, "Readable notice link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    downloadableLink: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Downloadable notice link is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
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

const NoticePdf = model("NoticePdf", noticePdfSchema);

export default NoticePdf;
