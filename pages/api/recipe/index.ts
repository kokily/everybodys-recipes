// Init Recipe
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function initRecipeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  type RequestType = {
    title: string;
    serving: number;
    thumbnail: string;
  };

  const { title, serving, thumbnail }: RequestType = req.body;

  if (req.method === 'POST') {
    
  }
}
