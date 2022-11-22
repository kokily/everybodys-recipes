import type { NextApiHandler } from 'next';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '../../../libs/db';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          username: {
            label: '아이디',
            type: 'username',
          },
          password: {
            label: '비밀번호',
            type: 'password',
          },
        },
        async authorize(credentials, _) {
          const user = await db.user.findFirst({
            where: { username: credentials?.username },
          });
          const password = credentials?.password;

          if (!user) {
            throw new Error('회원 가입 후 이용해 주세요');
          }

          if (!password) {
            throw new Error('비밀번호가 입력되지 않았습니다');
          }

          const valid = await bcrypt.compare(password, user.password);

          if (!valid) {
            throw new Error('비밀번호가 틀렸습니다');
          }

          return {
            id: user.id,
            name: user.username,
          };
        },
      }),
    ],
    secret: process.env.SECRET,
  });

export default authHandler;
