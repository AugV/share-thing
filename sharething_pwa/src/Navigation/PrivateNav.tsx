import React from "react";
import { Switch, Route, Redirect } from "react-router";
import * as ROUTES from "../Constants/Routes";
import AccountScreen from "../Account/AccountScreen";
import HomeScreen from "../Sharing/HomeScreen";
import PasswordResetScreen from "../Account/PasswordResetScreen";
import ItemController from "../Sharing/ItemController";
import PublicScreen from "../Sharing/PublicScreen";
import Firebase, { withFirebase } from "../Firebase";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  firebase: Firebase;
}

const PrivatePage = (props: Props) => {
  if (!props.firebase.getEmail()) {
    console.log("no EMAIL");
    return <Redirect to={ROUTES.LANDING} />;
  }
  return (
    <div>
      <Switch>
        <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
        <Route path={ROUTES.HOME} component={HomeScreen} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} />
        <Route path={ROUTES.ITEM} component={ItemController} />
        <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
      </Switch>
      <Navbar fixed="bottom"  variant="dark">
        <Nav>
          <LinkContainer to={ROUTES.HOME}>
            {/* <Nav.Link>Home</Nav.Link> */}
            <NavItem>Public</NavItem>
          </LinkContainer>
          <LinkContainer to={ROUTES.PUBLIC}>
            <NavItem>Public</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  );
};

export default withFirebase(PrivatePage);
