import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { SearchList } from './SearchList';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';

const Search: React.FC = () => {
    const fetchResult = () => {

    };

    return (
        <div>
            <Switch>
                <Route
                    path={ROUTES.SEARCH_LIST}
                    component={SearchList}
                />
            </Switch>
            <MainNavBar activeIcon="search" />
        </div>
    );
};

export { Search };
