import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import Account from '../Account/AccountScreen';
import { Home } from '../Sharing/HomeScreen';
import PasswordResetScreen from '../Account/PasswordResetScreen';
import ItemController from './ItemRoutes';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withAuthorization from '../Session/WithAuthorization';
import { PublicScreen } from '../Sharing/PublicScreen';
import { ConversationsScreen } from '../Sharing/ConversationsScreen';

const condition = (authUser: object) => !!authUser;

const PrivateRoutes = () => {
    return (
      <div>
      <Switch>
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} />
        <Route path={ROUTES.ITEM} component={ItemController} />
        <Route path={ROUTES.MESSAGES} component={ConversationsScreen} />
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

export const Private = withAuthorization(condition)(PrivateRoutes);
