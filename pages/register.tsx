import type { NextPage } from 'next';
import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const RegisterPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onRegister = async (e: MouseEvent) => {
    e.preventDefault();

    if ([username, password].includes('')) {
      console.log('입력하센!');
      return;
    }

    const response = await axios.post('/api/auth/add', {
      username,
      password,
    });

    if (!response.data) {
      console.log(response.status);
      return;
    } else {
      router.push('/login');
    }
  };

  if (status === 'authenticated') {
    router.replace('/');
  }

  return (
    <div>
      <h2>RegisterPage</h2>

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
        <button onClick={onRegister}>회원가입</button>
      </div>
    </div>
  );
};

export default RegisterPage;
