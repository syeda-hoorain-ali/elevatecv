import { z } from "zod";

export const signInSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email should be at least 5 characters long" })
    .max(100, { message: "Email cannot exceed 100 characters" }),
  
  password: z.string()
    .min(8, { message: "Password should be at least 8 characters" })
    .max(50, { message: "Password cannot exceed 50 characters" })
});
