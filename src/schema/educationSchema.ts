import { z } from "zod";

export const educationSchema = z.object({
    educations: z.array(z.object({
        universityName: z
            .string()
            .min(2, "University name must be at least 2 characters")
            .max(100, "University name must be less than 100 characters"),

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

        degree: z
            .string()
            .min(2, "Degree must be at least 2 characters")
            .max(50, "Degree must be less than 50 characters"),

        major: z
            .string()
            .min(2, "Major must be at least 2 characters")
            .max(50, "Major must be less than 50 characters"),

    }).superRefine((data, ctx) => {
        const educationData = data as {
            startDate: Date;
            endDate: Date;
        };

        if (educationData.endDate <= educationData.startDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message: "End date must be after the start date",
            });
        }

    }))
})