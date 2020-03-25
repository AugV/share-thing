import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { SearchList } from './SearchList';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { toItemQuery } from '../../Entities/Mappers';

const SearchPage: React.FC<FirebaseProps> = (props) => {
    const query = (name: string, groups: string[]) => {
        console.log(name);
        console.log(groups);
        props.firebase.queryItems(toItemQuery(name, groups));

    };

    return (
        <div>
            <Switch>
                <Route
                    path={ROUTES.SEARCH_LIST}
                    render={(propss) => (
                        <SearchList
                            {...propss}
                            onSearch={query}
                        />
                    )}
                />
            </Switch>
            <MainNavBar activeIcon="search" />
        </div>
    );
};

export const Search = withFirebase(SearchPage);
