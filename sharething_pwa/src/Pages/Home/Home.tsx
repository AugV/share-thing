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
import { BsFillGearFill } from 'react-icons/bs';
import { Dropdown, Menu, Button } from 'antd';

import { ClickParam } from 'antd/lib/menu';

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

    const settingsMenuDropDown = () => (
      <React.Fragment>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ background: 'lightgrey', height: '50px' }} >
            <BsFillGearFill size={30} />
          </Button>
        </Dropdown>
      </React.Fragment>
    );

    const handleSettingsMenuClick = (e: ClickParam) => {
        switch (e.key) {
            case '1':
                history.push(ROUTES.ACCOUNT);
                break;
            case '2':
                history.push(ROUTES.SIGN_OUT);
                break;
            default:
                history.push(ROUTES.ACCOUNT);
                break;
        }
    };

    const menu = (
      <Menu onClick={handleSettingsMenuClick}>
        <Menu.Item key="1" style={{ fontSize: '20pt', marginBottom: '5px' }}>
          Account
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2" style={{ fontSize: '20pt', marginBottom: '5px' }}>
          Sign out
        </Menu.Item>
      </Menu>
    );

    const { userItems } = props;

    return (
    <div>
      <HomeHeader
        subPages={subPages}
        action={settingsMenuDropDown()}
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
