import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import Account from '../Pages/Account';
import LandingScreen from '../Pages/Landing';
import SignInScreen from '../Pages/Auth/SignIn';
import SignUpScreen from '../Pages/Auth/SignUp';

const LandingRoutes = () => (
    <div>
    <Switch>
       <Route path={ROUTES.ACCOUNT} component={Account} />
       <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
       <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
       <Route component={LandingScreen} />
    </Switch>
    </div>
);

export default LandingRoutes;
