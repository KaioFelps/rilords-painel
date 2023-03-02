import { prisma } from "@/lib/prisma";
import { authenticate } from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  try {
    const { token } = req.headers as { token: string }
    const isAuthenticated = await authenticate(token)

    const getPage = z.object({
      page: z.coerce.number().optional()
    })

    const getPageResult = getPage.parse(req.query)

    const PER_PAGE = 10
    const currentPage = !!getPageResult.page ? getPageResult.page - 1 : 0

    if (!token || !isAuthenticated) return res.status(405).end()

    const getProjectsParams = z.object({
      tags: z.string().optional(),
      query: z.string().optional(),
    })

    const { tags, query } = getProjectsParams.parse(
      !!req.body ? req.body : { tags: undefined, query: undefined }
    )

    const projects = await prisma.project.findMany({
      take: PER_PAGE,
      skip: currentPage * 10,

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
    })

    const projectsAmount = await prisma.project.count()
    const totalPages = Math.ceil(projectsAmount / PER_PAGE)

    const response = {
      currentPage: currentPage + 1,
      perPage: PER_PAGE,
      totalPages,
      totalProjectsLength: projectsAmount,
      responseLength: projects.length,
      data: projects
    }

    res.status(200).json(response)
  }

  catch(e) {
    console.log(e)
    res.status(404).end()
  }
}