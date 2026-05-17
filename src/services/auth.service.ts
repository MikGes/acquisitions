import { eq } from "drizzle-orm"
import { db } from "../config/database.js"
import { users } from "../models/user.model.js"
import logger from "../config/logger.js"
import bcrypt from "bcryptjs"
export enum Role {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator",
}
export const createUser = async ({ name, email, password, role = Role.USER }: { name: string, email: string, password: string, role: Role }) => {
    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
        if (existingUser.length > 0) throw new Error("User already exists")
        const hashedPassword = await bcrypt.hash(password, 10)

        const [newUser] = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role
        }).returning({ id: users.id, name: users.name, email: users.email, role: users.role, created_at: users.created_at })
        logger.info(`User has been created with this info: ${newUser}`)
        return newUser
    } catch (error) {
        logger.error(`Error creating a user: ${error}`)
        throw error
    }
}