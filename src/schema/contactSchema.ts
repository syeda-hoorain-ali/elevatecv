import { z } from "zod";

export const contactSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name must be less than 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces." }),

    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name must be less than 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces." }),

    subject: z
        .string()
        .min(3, { message: "Subject must be at least 3 characters long." })
        .max(100, { message: "Subject must be less than 100 characters." }),

    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),

    message: z
        .string()
        .min(10, { message: "Message must be at least 10 characters long." })
        .max(500, { message: "Message must be less than 500 characters." }),
});
