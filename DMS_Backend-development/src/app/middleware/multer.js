import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "file-" + uniqueSuffix);
  },
});

const pdfUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /pdf/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"));
    }
  },
}).single("file");

const imageUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"));
    }
  },
}).single("image");

const pdfAndVideoUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /flv|webm|avchd|wmv|avi|mov|mp4|mkv|pdf/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"));
    }
  },
}).array("files", 2);

export { pdfUploader, imageUploader, pdfAndVideoUploader };
