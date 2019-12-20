import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
<<<<<<< HEAD:sharething_pwa/src/Navigation/LandingNav.tsx
import LandingScreen from '../Account/LandingScreen';
import SignInScreen from '../Account/SignInScreen';
import SignUpScreen from '../Account/SignUpScreen';
=======
import Account from '../Pages/Account';
import LandingScreen from '../Pages/Landing';
import SignInScreen from '../Pages/Auth/SignIn';
import SignUpScreen from '../Pages/Auth/SignUp';
>>>>>>> 179e7ddffe49a8270a1235f1fe81ed23f1012c19:sharething_pwa/src/Routes/Landing.tsx

const LandingRoutes = () => (
    <div>
    <Switch>
       <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
       <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
       <Route component={LandingScreen} />
    </Switch>
    </div>
);

export default LandingRoutes;
