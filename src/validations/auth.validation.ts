import { email, z } from "zod"
import { Role } from "../services/auth.service.js"

export const signupSchema = z.object({
    name: z.string().trim().min(2).max(255),
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(6).max(128),
    role: z.enum(Role).default(Role.USER),
})

export const signinSchema = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(1)
})