import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withAuthorization } from "../Session";

const condition = authUser => !!authUser;

class HomeScreen extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        <SignOutButton />
      </div>
    )
  }
}

export default withAuthorization(condition)(HomeScreen);