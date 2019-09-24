import React from "react";
import { Switch, Route } from "react-router";
import * as ROUTES from "../Constants/Routes";
import AccountScreen from "../Account/AccountScreen";
import HomeScreen from "../Sharing/HomeScreen";
import PasswordResetScreen from "../Account/PasswordResetScreen";
import AddItemScreen from "../Sharing/AddItemScreen";
import PublicScreen from "../Sharing/PublicScreen";

export const PrivatePage = () =>(
    <Switch>
        <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
        <Route path={ROUTES.HOME} component={HomeScreen} />
        <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
        <Route path={ROUTES.ADD_ITEM} component={AddItemScreen} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} /> 
      </Switch>
);