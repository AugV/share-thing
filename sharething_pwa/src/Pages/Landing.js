import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../Constants/Routes';


function LandingScreen() {
  return (
    <div className="container">
      <h1>ShareThing</h1>
      <p>
        <Link to={ROUTES.SIGN_IN}>Sign-In</Link>
      </p>
      <p>
        <Link to={ROUTES.SIGN_UP}>Sign-Up</Link>
      </p>
    </div>
  )
}

export default LandingScreen;