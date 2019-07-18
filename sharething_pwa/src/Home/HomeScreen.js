import React from 'react';
import SignOutButton from '../Login/SignOut';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Redirect } from 'react-router-dom';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  render() {
    console.log(this.props.firebase.auth.currentUser);
    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        {this.props.firebase.auth.currentUser ? <SignOutButton /> : <Redirect to="/" />}
      </div>
    )
  }
}

export default withFirebase(HomeScreen);