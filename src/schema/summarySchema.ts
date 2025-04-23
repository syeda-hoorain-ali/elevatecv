import { z } from "zod";

export const summarySchema = z.object({
    summary: z
        .string()
        .min(50, { message: "Summary must be at least 50 characters long" })
        .max(350, { message: "Summary cannot exceed 350 characters" }),
})