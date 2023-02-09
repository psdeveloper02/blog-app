import { IBlog } from "@/models"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = IBlog

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await (
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${req.query.blogId}`
    )
  ).json()
  res.status(200).json(data)
}
