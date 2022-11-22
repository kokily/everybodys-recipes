import type { User } from '@prisma/client';
import { createContext, ReactNode, useContext, useState } from 'react';

type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);

interface Props {
  children: ReactNode;
}

export function UserContextProvider({ children }: Props) {
  const userState = useState<User | null>(null);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export function useUserState() {
  const userState = useContext(UserContext);

  if (!userState) {
    throw new Error('User Context is not used!');
  }

  return userState;
}
