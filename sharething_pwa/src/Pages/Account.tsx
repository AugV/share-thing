import React from 'react';

import { AuthUserContext } from '../Utils';
import { PasswordResetForm } from './Auth/PasswordReset';
import PasswordChangeForm from './Auth/PasswordChange';
import { Typography } from 'antd';
import { SubPageHeader } from '../Components/Headers/SubPageHeader';
import { useTranslation } from 'react-i18next';

const AccountScreenPage = () => {
    const { t, i18n } = useTranslation();
    return(
    <React.Fragment>

      <SubPageHeader title="Account"/>

      <AuthUserContext.Consumer>
        {(authUser: any) => (
          <div style={{ margin: '10px' }}>
            <Typography>{t('youAreLoggedInAs')} <Typography.Title>{authUser.email}</Typography.Title></Typography>

            <Typography.Title level={2}>{t('resetPassword')}</Typography.Title>
            <PasswordResetForm />
          <br/>
            <Typography.Title level={2}>{t('changePassword')}</Typography.Title>
            <PasswordChangeForm />
          </div>
        )}
      </AuthUserContext.Consumer>

    </React.Fragment>
    );
};

export const Account = AccountScreenPage;
