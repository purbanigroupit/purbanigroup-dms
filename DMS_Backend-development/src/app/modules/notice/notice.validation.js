import { z } from "zod";

const uploadNoticeZodSchema = z.object({
  body: z.object({
    file: z
      .string()
      .includes("tuna", { message: "Must include PDF" })
      .optional(),
    title: z
      .string({
        required_error: "title is required",
      })
      .nonempty(),
    department: z
      .string({
        required_error: "department is required",
      })
      .nonempty(),
    subDepartment: z.string().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const NoticeValidation = {
  uploadNoticeZodSchema,
};
