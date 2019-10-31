import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import AccountScreen from '../Account/AccountScreen';
import { Home } from '../Sharing/HomeScreen';
import PasswordResetScreen from '../Account/PasswordResetScreen';
import ItemController from '../Sharing/ItemController';
import PublicScreen from '../Sharing/PublicScreen';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withAuthorization from '../Session/WithAuthorization';

const condition = (authUser: object) => !!authUser;

const PrivatePage = () => {
    return (
      <div>
      <Switch>
        <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} />
        <Route path={ROUTES.ITEM} component={ItemController} />
        <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
      </Switch>
      <Navbar fixed="bottom" variant="dark">
        <Nav>
          <LinkContainer to={ROUTES.HOME}>
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

export const Private = withAuthorization(condition)(PrivatePage);
