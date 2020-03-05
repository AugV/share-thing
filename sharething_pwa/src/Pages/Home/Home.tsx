import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../../Constants/Routes';
import { MyItemsPage } from './MyItems';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { HomeHeader } from '../../Components/headers/Header';
import { withFirebase } from '../../Firebase/Context';
import { UserItemsDocument } from '../../Entities/Interfaces';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { LentItemsPage } from './LentItems';
import { BorrowedItemsPage } from './BorrowedItems';

const HomeRoutes: React.FC<FirebaseProps> = (props) => {
    const [userItemsState, setUserItemsState] = useState<UserItemsDocument | undefined>(undefined);

    const listenerCallback = (userItems: UserItemsDocument) => {
        setUserItemsState(userItems);
    };

    useEffect(() => {
        return props.firebase.getUserItemsDocument(listenerCallback);
    }, [props.firebase]);

    const subPages: Map<string, string> = function getMapForDropdown(): Map<string, string> {
        const map = new Map();
        map.set(ROUTES.MY_ITEMS, 'Owned');
        map.set(ROUTES.LENT_ITEMS, 'Lent');
        map.set(ROUTES.BORROWED_ITEMS, 'Borrowed');
        return map;
    }();

    return (
    <div>
      <HomeHeader subPages={subPages}/>
      <Switch>
        <Route
          path={ROUTES.MY_ITEMS}
          render={(propss) => (<MyItemsPage {...propss} itemList={userItemsState?.userOwnedItemList}/>)}
        />
        <Route
          path={ROUTES.LENT_ITEMS}
          render={(propss) => (<LentItemsPage {...propss} itemList={userItemsState?.userLentItemList}/>)}
        />
        <Route
          path={ROUTES.BORROWED_ITEMS}
          render={(propss) => (<BorrowedItemsPage {...propss} itemList={userItemsState?.userBorrowedItemList}/>)}
        />
      </Switch>
      <MainNavBar activeIcon="home" />
    </div>
    );
};

export const Home = withFirebase(HomeRoutes);
