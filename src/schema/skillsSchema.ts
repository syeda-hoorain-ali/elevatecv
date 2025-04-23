import { z } from "zod";

export const skillsSchema = z.object({
    skills: z.array(z.object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must be less than 100 characters"),

        rating: z
            .number()
            .min(1, "Rating must be at least 1 star")
            .max(5, "Rating must be less than 5 star"),
    }))
})