import { z } from "zod";

// ZOD is an extra layer of validation
// Defining a Zod schema for validating user creation request data
const authZodSchema = z.object({
  body: z.object({
    employeeId: z.string({
      required_error: "Employee Id is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

// Export the validation schema as part of the UserValidation object
export const AuthValidation = {
  authZodSchema,
};
