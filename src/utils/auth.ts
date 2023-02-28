import bcrypt from "bcrypt"

import { prisma } from "../lib/prisma"

export async function authenticate(plainPassword: string) {
    const [{ hash }] = await prisma.pinHash.findMany()

    const match = bcrypt.compare(plainPassword, hash)
    return match
}