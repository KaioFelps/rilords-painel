import { prisma } from "@/lib/prisma";
import { authenticate } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token = "" } = req.headers as { token: string }
        const isAuthenticated = await authenticate(token)

        const deletedProjectID = z.object({
            id: z.coerce.number()
        })
        const { id: projectID } = deletedProjectID.parse(req.query)

        if (!token) return res.status(405).end()
        if (!req.query) return res.status(400).json("No ID have been provided")
        if (Number.isNaN(projectID)) return res.status(400).json("ID must be a number")

        const beingDeletedProject = await prisma.project.deleteMany({
            where: {
                id: {
                    equals: projectID
                }
            }
        })

        if (beingDeletedProject.count === 0) {
            res.status(200).json("No projects have been deleted")
        }

        res.status(204).end()
    }

    catch(e) {
        console.log(e)
        res.status(500).end()
    }
}