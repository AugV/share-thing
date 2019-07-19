import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withFirebase } from '../Firebase';
import { Redirect } from 'react-router-dom';

class HomeScreen extends React.Component {

  render() {
    const isLogged = this.props.firebase.auth.currentUser;
    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        {isLogged ? <SignOutButton /> : <Redirect to="/" />}
      </div>
    )
  }
}

export default withFirebase(HomeScreen);