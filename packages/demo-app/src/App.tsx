import { LogtoProvider, useLogto, UserInfoResponse } from '@logto/react';
import { signInNotificationStorageKey } from '@logto/schemas';
import { demoAppApplicationId } from '@logto/schemas/lib/seeds';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import '@/scss/normalized.scss';
import * as styles from './App.module.scss';
import Callback from './Callback';
import congrats from './assets/congrats.svg';
import initI18n from './i18n/init';

void initI18n();

const Main = () => {
  const { isAuthenticated, fetchUserInfo, signIn, signOut } = useLogto();
  const [user, setUser] = useState<UserInfoResponse>();
  const { t } = useTranslation(undefined, { keyPrefix: 'demo_app' });
  const isInCallback = Boolean(new URL(window.location.href).searchParams.get('code'));

  useEffect(() => {
    if (!isAuthenticated && !isInCallback) {
      sessionStorage.setItem(signInNotificationStorageKey, t('notification'));
      void signIn(window.location.href);
    }
  }, [isAuthenticated, isInCallback, signIn, t]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const userInfo = await fetchUserInfo();
        setUser(userInfo);
      }
    })();
  }, [isAuthenticated, fetchUserInfo]);

  if (isInCallback) {
    return <Callback />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <img src={congrats} alt="Congrats" />
        <div className={styles.title}>{t('title')}</div>
        <div className={styles.text}>{t('subtitle')}</div>
        <div className={styles.infoCard}>
          <div>
            {t('username')}
            <span>{user.username}</span>
          </div>
          <div>
            {t('user_id')}
            <span>{user.sub}</span>
          </div>
        </div>
        <div
          className={styles.button}
          onClick={async () => signOut(`${window.location.origin}/demo-app`)}
        >
          {t('sign_out')}
        </div>
        <div className={styles.continue}>
          <div className={styles.hr} />
          {t('continue_explore')}
          <div className={styles.hr} />
        </div>
        <div className={styles.actions}>
          <a href="#">{t('customize_sign_in_experience')}</a>
          <span />
          <a href="#">{t('enable_passwordless')}</a>
          <span />
          <a href="#">{t('add_social_connector')}</a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LogtoProvider
      config={{
        endpoint: window.location.origin,
        appId: demoAppApplicationId,
      }}
    >
      <Main />
    </LogtoProvider>
  );
};

export default App;