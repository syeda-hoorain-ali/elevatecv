import { z } from "zod";

export const languageSchema = z.object({
    languages: z.array(z.object({
        language: z
            .string()
            .min(3, "Language must be at least 3 character")
            .max(100, "Language must be less than 100 characters"),

        rating: z
            .number()
            .min(1, "Rating must be at least 1 star")
            .max(5, "Rating must be less than 5 star"),
    }))
})