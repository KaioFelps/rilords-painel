// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/utils/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from "zod"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { token } = req.headers as { token: string };

    const isAuthenticated = await authenticate(token);

    if (!token || !isAuthenticated) return res.status(405).end()
    if (!req.body) return res.status(400).end()

    const createNewProject = z.object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      tags: z.string().array(),
    });

    const { title, description, imageUrl, tags } = createNewProject.parse(
      req.body
    );

    const parsedTags = JSON.stringify(tags);
    console.log(parsedTags);

    await prisma.project.create({
      data: {
        title,
        description,
        image: imageUrl,
        tags: parsedTags,
      },
    });

    res.status(204).end();
  }
  
  catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
