import { z } from "zod";

const uploadKnowledgeZodSchema = z.object({
  body: z.object({
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
    category: z
      .string({
        required_error: "category is required",
      })
      .nonempty(),
    pdfLink: z.string().url().optional(),
    cloudinaryPdfId: z.string().optional(),
    videoLink: z.string().url().optional(),
    cloudinaryVideoId: z.string().optional(),
  }),
});

// Export the validation schema as part of the UserValidation object
export const KnowledgeValidation = {
  uploadKnowledgeZodSchema,
};
