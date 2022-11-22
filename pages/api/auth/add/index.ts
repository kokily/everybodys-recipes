import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import db from '../../../../libs/db';

export default async function addUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.body.username as string;
  const password = req.body.password as string;

  if (req.method === 'POST') {
    const data = await db.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
      },
    });

    let user = {
      id: data.id,
      username: data.username,
    };

    res.status(200).json(user);
  }
}
