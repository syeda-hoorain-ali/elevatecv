import { z } from "zod";

export const interestsSchema = z.object({
    interests: z.array(z.object({
        hobby: z
            .string()
            .min(3, "Hobby must be at least 3 character")
            .max(100, "Hobby must be less than 100 characters"),
    }))
})