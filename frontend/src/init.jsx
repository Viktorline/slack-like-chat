import { ErrorBoundary, Provider } from '@rollbar/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { Provider as StoreProvider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import SocketProvider from './contexts/SocketProvider.jsx';

import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: '02cd77972a264dbb9c9981c6b8f12537',
  environment: 'testenv',
};

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const vdom = (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <SocketProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </Provider>
  );

  return vdom;
};

export default init;
