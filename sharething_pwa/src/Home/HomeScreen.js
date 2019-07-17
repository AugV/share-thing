import React from 'react';
import SignOutButton from '../Login/SignOut';
import {withFirebase} from '../Firebase';


function HomeScreen() {
  return (
    <div className="container">
      <h1>Home Screen</h1>
      <h2>Signed Up Successfully</h2>
      <h2></h2>
      <SignOutButton />
    </div>
  )
}

export default withFirebase(HomeScreen);