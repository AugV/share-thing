import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordResetForm } from './PasswordResetScreen';
import PasswordChangeForm from './PasswordChange';

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
