import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordResetForm } from './PasswordResetScreen';
import PasswordChangeForm from './PasswordChange';

const AccountScreen = () => (
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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountScreen);