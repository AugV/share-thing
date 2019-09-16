import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import * as ROUTES from "../Constants/Routes";

class Navigator extends React.Component {
  render() {
    return (
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.SIGN_IN}>Sign-In</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.SIGN_UP}>Sign-Up</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.HOME}>HomePage</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.PASSWORD_RESET}>ResetPassword</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.ADD_ITEM}>Add-Item</Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navigator;
