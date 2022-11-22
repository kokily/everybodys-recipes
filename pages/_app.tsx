import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  Hydrate,
  dehydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserContextProvider } from '../libs/context/UserContext';
import { GlobalStyle } from '../styles';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = dehydrate(queryClient);

  return (
    <UserContextProvider>
      <GlobalStyle />

      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </UserContextProvider>
  );
}

export default MyApp;
