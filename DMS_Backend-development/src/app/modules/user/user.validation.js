import { z } from "zod";
import { department, role } from "./user.constant.js";

const createUserZodSchema = z.object({
  body: z.object({
    image: z
      .string()
      .includes("tuna", { message: "Must include image" })
      .optional(),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, { message: "Must be 3 or more characters long" })
      .max(32, { message: "Must be 32 or fewer characters long" })
      .nonempty({ message: "Cannot be empty" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .nonempty(),
    employeeId: z.string({ required_error: "Email is required" }).nonempty(),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
      .nonempty(),
    role: z.enum(role, {
      required_error: "Role is required",
    }),
    department: z.enum(department, {
      required_error: "Department is required",
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Must be 3 or more characters long" })
      .max(32, { message: "Must be 32 or fewer characters long" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    employeeId: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
      .optional(),
    role: z.enum(role).optional(),
    department: z.enum(department).optional(),
    knowledgeAccess: z.string().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
