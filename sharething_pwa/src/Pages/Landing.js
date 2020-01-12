import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../Constants/Routes';


function LandingScreen() {
  return (
    <div>
      <Link to={ROUTES.SIGN_IN}>
        <h2>Sing-in</h2>
      </Link>
      <Link to={ROUTES.SIGN_UP}>
        <h2>Sing-up</h2>
      </Link>
    </div>
  )
}

export default LandingScreen;