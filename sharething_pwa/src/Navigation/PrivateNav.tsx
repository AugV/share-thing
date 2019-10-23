import React from "react";
import { Switch, Route, Redirect } from "react-router";
import * as ROUTES from "../Constants/Routes";
import AccountScreen from "../Account/AccountScreen";
import HomeScreen from "../Sharing/HomeScreen";
import PasswordResetScreen from "../Account/PasswordResetScreen";
import ItemController from "../Sharing/ItemController";
import PublicScreen from "../Sharing/PublicScreen";
import Firebase, { withFirebase } from "../Firebase";

interface Props {
  firebase: Firebase;
}

const PrivatePage = (props: Props) => {
  if (!props.firebase.getEmail()) {return <Redirect to={ROUTES.LANDING} />}
   return (<Switch>
      <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
      <Route path={ROUTES.HOME} component={HomeScreen} />
      <Route path={ROUTES.PUBLIC} component={PublicScreen} />
      <Route path={ROUTES.ITEM} component={ItemController} />
      <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
    </Switch>)
  }
;

export default withFirebase(PrivatePage);
