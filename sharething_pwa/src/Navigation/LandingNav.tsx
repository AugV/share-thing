import React from "react";
import { Switch, Route } from "react-router";
import * as ROUTES from "../Constants/Routes";
import AccountScreen from "../Account/AccountScreen";
import LandingScreen from "../Account/LandingScreen";
import SignInScreen from "../Account/SignInScreen";
import SignUpScreen from "../Account/SignUpScreen";

const LandingNav = () =>(
    <div>
    <Switch>
       <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
       <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
       <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
       <Route component={LandingScreen} />
    </Switch>
    </div>
);

export default LandingNav;