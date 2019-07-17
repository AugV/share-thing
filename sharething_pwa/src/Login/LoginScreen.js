import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../Constants/Routes';


function LoginScreen() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to={ROUTES.SIGN_IN}>Sign-In</Link> B.
      </p>
      <p>
        <Link to={ROUTES.SIGN_UP}>Sign-Up</Link> BIATCH.
      </p>
    </div>
  )
}

export default LoginScreen;