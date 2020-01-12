import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import * as ROUTES from '../Constants/Routes';

const NavBarComponent = () => (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href={ROUTES.HOME}>Share-Thing</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href={ROUTES.HOME}>Share</Nav.Link>
      <Nav.Link href={ROUTES.PUBLIC}>Borrow</Nav.Link>
      <Nav.Link href={ROUTES.CONVO_LIST}>Talk</Nav.Link>
    </Nav>
    <Nav className="mr">
      <Nav.Link href={ROUTES.ACCOUNT}>Profile</Nav.Link>
      <Nav.Link href={ROUTES.SIGN_OUT}>Sign-Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export const MainNavBar = NavBarComponent;
