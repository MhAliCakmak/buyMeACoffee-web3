import * as z from "zod";

export const ValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(100, "Message must be at most 100 characters"),
  type: z.string().min(1, "Please select a coffee type"),
  size: z.string().min(1, "Please select a size"),
});
