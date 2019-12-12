import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import Account from '../Pages/Account';
import { Home } from '../Pages/Home';
import PasswordResetScreen from '../Pages/Auth/PasswordReset';
import ItemController from '../Pages/Item/Item';
import withAuthorization from '../Utils/WithAuthorization';
import { PublicScreen } from '../Pages/Public';
import { AllConvosPage } from '../Pages/Convo/AllConvosPage';
import { ConvoScreen } from '../Pages/Convo/SingleConvoPage';

const condition = (authUser: object) => !!authUser;

const PrivateRoutes = () => {
    return (
      <div>
      <Switch>
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} />
        <Route path={ROUTES.ITEM} component={ItemController} />
        <Route path={ROUTES.CONVO} component={ConvoScreen} />
        <Route path={ROUTES.CONVO_LIST} component={AllConvosPage} />
        <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
      </Switch>
    </div>
    );
};

export const Private = withAuthorization(condition)(PrivateRoutes);
