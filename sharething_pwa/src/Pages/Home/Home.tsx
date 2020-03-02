import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../../Constants/Routes';
import { MyItemsPage } from './MyItems';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { HomeHeader } from '../../Components/headers/HomeHeader';
import { withFirebase } from '../../Firebase/Context';
import { UserItemsDocument } from '../../Entities/Interfaces';
import { FirebaseProps } from '../../Entities/PropsInterfaces';

const HomeRoutes: React.FC<FirebaseProps> = (props) => {
    const [userItemsState, setUserItemsState] = useState<UserItemsDocument | undefined>(undefined);

    const listenerCallback = (userItems: UserItemsDocument) => {
        setUserItemsState(userItems);
    };

    useEffect(() => {
        return props.firebase.getUserItemsDocument(listenerCallback);
    }, [props.firebase]);

    return (
    <div>
      <HomeHeader/>
      <Switch>
        <Route
          render={(propss) => (<MyItemsPage {...propss} itemList={userItemsState?.userOwnedItemList}/>)}
          path={ROUTES.MY_ITEMS}
        />
        <Route path={ROUTES.LENT_ITEMS} component={MyItemsPage} />
        <Route path={ROUTES.BORROWED_ITEMS} component={MyItemsPage} />
      </Switch>
      <MainNavBar activeIcon="home" />
    </div>
    );
};

export const Home = withFirebase(HomeRoutes);
