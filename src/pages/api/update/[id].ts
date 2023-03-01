import { prisma } from "@/lib/prisma";
import { authenticate } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token = "" } = req.headers as { token: string }
        const isAuthenticated = await authenticate(token)
        
        const updatedProjectID = z.object({
            id: z.coerce.number(),
        })
        const { id: projectID } = updatedProjectID.parse(req.query)

        if (!token || !isAuthenticated) return res.status(405).end()
        if (!req.query) return res.status(400).json("No ID have been provided")
        if (Number.isNaN(projectID)) return res.status(400).json("ID must be a number")
        if (!req.body) return res.status(400).json("No request body found")

        const updatedProjectNewData = z.object({
            title: z.string(),
            description: z.string(),
            imageUrl: z.string(),
            tags: z.string().array(),
        })

        const { title, description, imageUrl, tags } = updatedProjectNewData.parse(req.body)

        const parsedTags = JSON.stringify(tags)

        const amountOfUpdatedItems = await prisma.project.updateMany({
            where: {
                id: {
                    equals: projectID
                }
            },
            data: {
                title,
                description,
                image: imageUrl,
                tags: parsedTags
            }
        })

        if (amountOfUpdatedItems.count === 0) {
            return res.status(200).json("No projects have been updated")
        }

        res.status(204).end()
    }

    catch(e) {
        res.status(500).end()
    }
}