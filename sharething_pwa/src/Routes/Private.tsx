import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import { Account } from '../Pages/Account';
import PasswordResetScreen from '../Pages/Auth/PasswordReset';
// import { ItemRouter } from '../Pages/Item/Item_old';
import withAuthorization from '../Utils/WithAuthorization';
import { PublicScreen } from '../Pages/Public';
import { AllConvosPage } from '../Pages/Convo/AllConvosPage';
import { ConvoScreen } from '../Pages/Convo/SingleConvoPage';
import { SingOut } from '../Pages/Auth/SignOut';
import { Home } from '../Pages/Home/Home';
import { ItemPage } from '../Pages/Item/Item';
import { FirebaseProps } from '../Entities/PropsInterfaces';
import { UserItemsDocument } from '../Entities/Interfaces';
import { withFirebase } from '../Firebase';

export const UserItemContext = React.createContext<UserItemsDocument | undefined>(undefined);

const condition = (authUser: object) => !!authUser;

const PrivateRoutes: React.FC<FirebaseProps> = (props) => {

    const [userItemsState, setUserItemsState] = useState<UserItemsDocument | undefined>(undefined);

    const listenerCallback = (userItems: UserItemsDocument) => {
        setUserItemsState(userItems);
    };

    useEffect(() => {
        return props.firebase.getUserItemsDocument(listenerCallback);
    }, [props.firebase]);

    return (
      <div>
        <UserItemContext.Provider value={userItemsState}>
          <Switch>
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.PUBLIC} component={PublicScreen} />
            <Route path={ROUTES.ITEM} component={ItemPage} />
            <Route path={ROUTES.SHAREGREEMENT} component={ConvoScreen} />
            <Route path={ROUTES.SHAREGREEMENT_LIST} component={AllConvosPage} />
            <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
            <Route path={ROUTES.SIGN_OUT} component={SingOut} />
          </Switch>
        </UserItemContext.Provider>
      </div>
    );
};

export const Private = withFirebase(withAuthorization(condition)(PrivateRoutes));
