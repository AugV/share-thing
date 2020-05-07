import React from 'react';

import { AuthUserContext } from '../Utils';
import { PasswordResetForm } from './Auth/PasswordReset';
import PasswordChangeForm from './Auth/PasswordChange';
import { Typography } from 'antd';
import { SubPageHeader } from '../Components/Headers/SubPageHeader';

const AccountScreenPage = () => (
  <React.Fragment>

    <SubPageHeader title="Account"/>

    <AuthUserContext.Consumer>
      {(authUser: any) => (
        <div style={{ margin: '10px' }}>
          <Typography.Title level={2}>Hello, {authUser.email}</Typography.Title>

          <Typography.Title level={2}>Reset password</Typography.Title>
          <PasswordResetForm />
        <br/>
          <Typography.Title level={2}>Change password</Typography.Title>
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>

  </React.Fragment>
);

export const Account = AccountScreenPage;
