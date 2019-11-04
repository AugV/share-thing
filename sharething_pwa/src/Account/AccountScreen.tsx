import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordResetForm } from './PasswordResetScreen';
import PasswordChangeForm from './PasswordChange';

export const AccountScreen = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordResetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

