import React from 'react';
import SignOutButton from '../Login/SignOut';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

function HomeScreen() {
  return (
    <div className="container">
      <h1>Home Screen</h1>
      <h2>Welcome</h2>
      <AuthUserContext.Consumer>
        {authUser => authUser ? <SignOutButton /> : <div>You are not logged in</div>}
      </AuthUserContext.Consumer>
    </div>
  )
}

export default withFirebase(HomeScreen);