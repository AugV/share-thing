import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../Constants/Routes';
import { Account } from '../Pages/Account';
import PasswordResetScreen from '../Pages/Auth/PasswordReset';
import withAuthorization from '../Utils/WithAuthorization';
import { SingOut } from '../Pages/Auth/SignOut';
import { Home } from '../Pages/Home/Home';
import { ItemPage } from '../Pages/Item/Item';
import { FirebaseProps } from '../Entities/PropsInterfaces';
import { UserItemsDocument, GroupNameAndId } from '../Entities/Interfaces';
import { withFirebase } from '../Firebase';
import { Borrow } from '../Pages/Borrow/Borrow';
import { Group } from '../Pages/Groups/Group';
import { SharegreementRouter } from '../Pages/Sharegreement/SharegreementRouter';

// TODO: make HOC provider for these Contexts
export const UserItemContext = React.createContext<UserItemsDocument | undefined>(undefined);
export const UserGroupContext = React.createContext<GroupNameAndId[] | undefined>(undefined);

const condition = (authUser: object) => !!authUser;

const PrivateRoutes: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const [userItemsState, setUserItemsState] = useState<UserItemsDocument | undefined>(undefined);
    const [groupNames, setGroupNames] = useState<GroupNameAndId[] | undefined>(undefined);

    const listenerCallback = (userItems: UserItemsDocument) => {
        setUserItemsState(userItems);
    };

    useEffect(() => {
        firebase.getUsersGroupNamesAndIds().then(userGroups => setGroupNames(userGroups));
        return firebase.getUserItemsDocument(listenerCallback);
    }, [firebase]);

    return (
        <UserItemContext.Provider value={userItemsState}>
          <UserGroupContext.Provider value={groupNames}>
            <Switch>
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.BORROW} component={Borrow} />
              <Route path={ROUTES.GROUP} component={Group} />
              <Route path={ROUTES.SHAREGREEMENT} component={SharegreementRouter} />
              <Route path={ROUTES.ITEM} component={ItemPage} />
              <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
              <Route path={ROUTES.SIGN_OUT} component={SingOut} />
            </Switch>
          </UserGroupContext.Provider>
        </UserItemContext.Provider>
    );
};

export const Private = withFirebase(withAuthorization(condition)(PrivateRoutes));
