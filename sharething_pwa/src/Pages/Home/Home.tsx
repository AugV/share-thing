import React from 'react';
import { Switch, Route } from 'react-router';
import * as ROUTES from '../../Constants/Routes';
import { MyItemsPage } from './MyItems';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { HomeHeader } from '../../Components/headers/HomeHeader';

const HomeRoutes = () => {
    return (
    <div>
      <HomeHeader/>
      <Switch>
        <Route path={ROUTES.MY_ITEMS} component={MyItemsPage} />
        <Route path={ROUTES.LENT_ITEMS} component={MyItemsPage} />
        <Route path={ROUTES.BORROWED_ITEMS} component={MyItemsPage} />
      </Switch>
      <MainNavBar activeIcon="home" />
    </div>
    );
};

export const Home = HomeRoutes;
