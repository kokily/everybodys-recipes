import axios from 'axios';
import { useQuery } from 'react-query';
import { useUserState } from '../context/UserContext';

async function getUserAPI() {
  const response = await axios.get('/api/auth/check');
  return response.data;
}

export default function useAuthLoadEffect() {
  const [, setUser] = useUserState();
  useQuery('user', () => getUserAPI(), {
    onSuccess: (data) => {
      setUser(data);
    },
  });
}
