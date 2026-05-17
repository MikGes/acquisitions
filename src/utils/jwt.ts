import jwt from "jsonwebtoken"
import logger from "../config/logger.js"
import type { Role } from "../services/auth.service.js"
const JWT_SECRET = process.env.JWT_SECRET || "OISishdfiuhasguiahi#IHIU#I#EIDSSAIDJ"

export const jwttoken = {
    sign: (payload: { id: number, name: string, email: string, role: string }) => {
        try {
            return jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1d"
            })
        } catch (error) {
            logger.error("Failed to sign jwt", error)
        }
    },
    verify: (payload: string) => {
        try {
            return jwt.verify(payload, JWT_SECRET)
        } catch (error) {
            logger.error("Failed to authenticate jwt", error)
        }
    }
}

