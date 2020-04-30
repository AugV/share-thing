import React from 'react';
import { Switch, Route, useHistory } from 'react-router';
import * as ROUTES from '../../Constants/Routes';
import { MyItemsPage } from './MyItems';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { HomeHeader } from '../../Components/Headers/HomeHeader';
import { UserItemsDocument } from '../../Entities/Interfaces';
import { LentItemsPage } from './LentItems';
import { BorrowedItemsPage } from './BorrowedItems';
import { withUserItems } from '../../Context/withUserItems';
import { BsBoxArrowRight } from 'react-icons/bs';
import { Typography } from 'antd';

interface UserItems {
    userItems: UserItemsDocument;
}

const HomeRoutes: React.FC<UserItems> = (props) => {
    const history = useHistory();

    const subPages: Map<string, string> = function getMapForDropdown(): Map<string, string> {
        const map = new Map();
        map.set(ROUTES.MY_ITEMS, 'Owned');
        map.set(ROUTES.LENT_ITEMS, 'Lent');
        map.set(ROUTES.BORROWED_ITEMS, 'Borrowed');
        return map;
    }();

    const signOutButton = () => (
      <React.Fragment>
          <BsBoxArrowRight onClick={signOut} size={50}/>
      </React.Fragment>
    );

    const signOut = () => {
        history.push(ROUTES.SIGN_OUT);
    };

    const { userItems } = props;

    return (
    <div>
      <HomeHeader
        subPages={subPages}
        action={signOutButton()}
      />
      {userItems &&
        (
          <Switch>
            <Route
              path={ROUTES.MY_ITEMS}
              render={(propss) => (<MyItemsPage {...propss} itemList={userItems.userOwnedItemList}/>)}
            />
            <Route
              path={ROUTES.LENT_ITEMS}
              render={(propss) => (<LentItemsPage {...propss} itemList={userItems.userLentItemList}/>)}
            />
            <Route
              path={ROUTES.BORROWED_ITEMS}
              render={(propss) => (<BorrowedItemsPage {...propss} itemList={userItems.userBorrowedItemList}/>)}
            />
          </Switch>
        )}
      <MainNavBar activeIcon="home" />
    </div>
    );
};

export const Home = withUserItems(HomeRoutes);
