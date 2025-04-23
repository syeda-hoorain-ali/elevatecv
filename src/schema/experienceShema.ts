import { z } from "zod";

export const experienceSchema = z.object({
    experiences: z.array(z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters")
            .max(100, "Title must be less than 100 characters"),

        company: z
            .string()
            .min(2, "Company must be at least 2 characters")
            .max(50, "Company must be less than 50 characters"),

        city: z
            .string()
            .min(2, "City must be at least 2 characters")
            .max(50, "City must be less than 50 characters"),

        startDate: z
            .date({
                required_error: "Start date is required",
                invalid_type_error: "Start date must be a valid date",
            }),

        endDate: z
            .date({
                required_error: "End date is required",
                invalid_type_error: "End date must be a valid date",
            }),


        summary: z
            .string()
            .max(500, "Summary must be less than 500 characters")
            .optional()

    }).superRefine((data, ctx) => {
        const experienceData = data as {
            startDate: Date;
            endDate: Date;
        };

        if (experienceData.endDate <= experienceData.startDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message: "End date must be after the start date",
            });
        }

    }))
})