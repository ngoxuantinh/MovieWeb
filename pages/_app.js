

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
import { TMDB_API_KEY, TMDB_API_NEW_VERSION, TMDB_API_VERSION } from 'config/tmdb';
import tmdbAPI from 'services/tmdbAPI';
import STATUSES from 'utils/constants/statuses';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter()

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/authentication/token/new?api_key=${TMDB_API_KEY}`);
    //     const authen = response.data;
    //     if (authen.success) {
    //       console.log(authen.request_token);
    //       saveState({
    //         request_token: authen.request_token,
    //         account_id: null,
    //         access_token: null,
    //       });
    //       router.push('/login')
    //     } else {
    //       console.log(authen);
    //     }
    //   } catch (error) {
    //     console.log('[AuthProvider useEffect] error => ', error);
    //   }
    // })();
    router.push('/login')
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          {/* <AuthProvider> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>

          {/* </AuthProvider> */}
        </ThemeProvider>
      </Provider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default MyApp;
