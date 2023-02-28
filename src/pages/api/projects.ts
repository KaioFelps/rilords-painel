import { prisma } from "@/lib/prisma";
import { authenticate } from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try {
        const { token } = req.headers as { token: string };
        const isAuthenticated = await authenticate(token);
  
        if (!token || !isAuthenticated) {
          throw new Error("Not allowed.");
          return;
        }
  
        const getProjectsParams = z.object({
          tags: z.string().optional(),
          query: z.string().optional(),
        });
  
        const { tags, query } = getProjectsParams.parse(
          !!req.body ? req.body : { tags: undefined, query: undefined }
        );
  
        const projects = await prisma.project.findMany({
          where: {
            tags: {
              contains: tags,
            },
            description: {
              contains: query,
            },
            title: {
              contains: query,
            },
          },
        });
  
        res.status(200).json(projects);
      }
      catch(error) {
        console.log(error)
        console.log(error)
        res.status(404)
      }
}