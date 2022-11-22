import type { NextPage } from 'next';
import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useUserState } from '../libs/context/UserContext';
import axios from 'axios';

const LoginPage: NextPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useUserState();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onLogin = async (e: MouseEvent) => {
    e.preventDefault();

    if ([username, password].includes('')) {
      console.log('입력하센!');
      return;
    }

    const response = await signIn('credentials', {
      username,
      password,
    });

    if (!response?.error && data?.user) {
      const target = await axios.get('/api/auth/check');

      if (!target.data) {
        console.log('사용자 없음');
        return;
      } else {
        setUser(target.data);
        console.log(user);
        router.replace('/');
      }
    }
  };

  if (status === 'authenticated') {
    router.replace('/');
  }

  return (
    <div>
      <h2>LoginPage</h2>

      <div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div>
        <button onClick={onLogin}>로그인</button>
      </div>
    </div>
  );
};

export default LoginPage;
