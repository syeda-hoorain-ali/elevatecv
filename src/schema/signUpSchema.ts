import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email should be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),

    password: z.string()
        .min(8, { message: "Password should be at least 8 characters" })
        .max(50, { message: "Password cannot exceed 50 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),

    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
