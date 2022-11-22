import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useUserState } from '../libs/context/UserContext';
import useAuthLoadEffect from '../libs/hooks/useAuthLoadEffect';

const Home: NextPage = () => {
  useAuthLoadEffect();
  const [user, _] = useUserState();

  return (
    <div>
      <h2>IndexPage</h2>

      {user ? (
        <div>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <>
          <div>
            <Link href="/login">로그인</Link>
          </div>
          <div>
            <Link href="/register">회원가입</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
