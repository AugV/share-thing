import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Constants/Routes';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from 'antd';

const LandingScreen: React.FC = () => {
    const { t, i18n } = useTranslation();

    const switchLanguage = () => {
        i18n.language === 'en' ? i18n.changeLanguage('lt') : i18n.changeLanguage('en');
    };

    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>

        <Typography.Title>Sharething</Typography.Title>
        <br/>

        <Link to={ROUTES.SIGN_IN}>
          <Typography.Title level={4}>{t('signIn')}</Typography.Title>
        </Link>

        <Link to={ROUTES.SIGN_UP}>
          <Typography.Title level={4}>{t('signUp')}</Typography.Title>
        </Link>

        <br/>
        <br/>
        <Button onClick={switchLanguage}>{t(i18n.language)}</Button>

      </div>
    );
};

export { LandingScreen };
