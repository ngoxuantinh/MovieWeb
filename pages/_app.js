

import { Provider } from 'react-redux';
import globalStyles from 'styles/global';

import { useStore } from 'store';
import ThemeProvider from 'utils/hocs/ThemeProvider';
import Layout from 'parts/Layout';
import { AuthProvider } from 'utils/hocs/AuthProvider';
import { useEffect, useState } from 'react';
import { STORAGE_KEY } from 'config/app-level';
import AuthContext from 'contexts/auth-context';
import { loadState, saveState } from 'utils/helpers/localStorage';
import { useRouter } from 'next/router';
import { TMDB_STATIC } from './user';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter()

  useEffect(() => {
    const {
      request_token: requestToken = '',
      access_token: initialAccessToken = '',
      account_id: initialAccountId = '',
      access_token_manual: accessTokenManual = ''
    } = loadState() || {};

    if (!initialAccessToken) {
      saveState({
        request_token: '',
        access_token: TMDB_STATIC.access_token,
        account_id: TMDB_STATIC.account_id
      });
    }

    if (!accessTokenManual) {
      router.push('/login')
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>

          </AuthProvider>
        </ThemeProvider>
      </Provider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default MyApp;
