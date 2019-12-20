import React from 'react';

import { AuthUserContext } from '../Utils';
import { PasswordResetForm } from './Auth/PasswordReset';
import PasswordChangeForm from './Auth/PasswordChange';

const AccountScreen = () => (
  <AuthUserContext.Consumer>
    {(authUser: any) => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordResetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default AccountScreen;
