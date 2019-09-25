import React from "react";
import { Switch, Route } from "react-router";
import * as ROUTES from "../Constants/Routes";
import AccountScreen from "../Account/AccountScreen";

const LandingNav = () =>(
    <Switch>
       <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
      </Switch>
);

export default LandingNav;