import { z } from "zod";

export const resumeTitleSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(100, { message: "Name cannot exceed 100 characters" }),
})