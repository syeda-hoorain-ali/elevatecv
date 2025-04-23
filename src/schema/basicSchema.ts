import { z } from "zod";

export const basicSchema = z.object({
    image: z.union([z.string(), z.instanceof(File)]),

    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(100, { message: "Name cannot exceed 100 characters" }),

    jobtitle: z
        .string()
        .min(5, { message: "jobtitle must be at least 5 characters long" })
        .max(100, { message: "jobtitle cannot exceed 100 characters" }),

    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email should be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),

    phone: z
        .string()
        .min(9, { message: "Phone should be at least 9 characters long" })
        .max(15, { message: "Phone cannot exceed 15 characters" }),

    country: z
        .string()
        .min(1, { message: "Please select your country" }),

    city: z
        .string()
        .min(1, { message: "Please select your city" }),
})
