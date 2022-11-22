import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '../../../../libs/db';

export default async function checkUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session?.user) {
      const user = await db.user.findFirst({
        where: { username: session.user.name! },
      });

      if (!user) {
        throw new Error('사용자가 없습니다.');
      }

      res.status(200).json({
        id: user.id,
        username: user.username,
      });
    } else {
      return;
    }
  }
}
