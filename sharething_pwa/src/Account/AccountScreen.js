import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordResetForm } from '../Authentication/PasswordReset';
import PasswordChangeForm from '../Authentication/PasswordChange';

const AccountScreen = () => (
<div>
  <Route path={'profile'} component={HomeScreen} />
  <Route path={'preferences'} component={PasswordResetScreen} />
  <Route path={'security'} component={AccountScreen} />
</div>

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