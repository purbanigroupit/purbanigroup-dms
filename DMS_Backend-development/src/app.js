import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import routes from "./app/routes/index.js";
import cookieParser from "cookie-parser";

const app = express(); // Create an instance of the Express application

const corsOptions = {
  origin: ["http://localhost:3000", "https://purbani-sand.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"],
};

// Application Middleware
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // Parse JSON request bodies
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
); // Parse URL-encoded request bodies

// Application Routes
app.use("/api/v1", routes);

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "https://purbani-sand.vercel.app");
  res.status(200).json({
    message: "Welcome to Purbani system!",
  });
});

// Handle not found
app.use((req, res) => {
  // Return a JSON response with the appropriate status code and error message
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
});

// Global Error Handler
// Middleware to handle errors globally and send standardized error responses
app.use(globalErrorHandler);

export default app;
