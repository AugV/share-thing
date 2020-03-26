import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { SearchPage } from './Search';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { ItemQuery, ItemPreview } from '../../Entities/Interfaces';

const BorrowItems: React.FC<FirebaseProps> = (props) => {
    const [items, setItems] = useState<ItemPreview[] | undefined>(undefined);

    const queryItems = (query: ItemQuery) => {
        props.firebase.queryItems(query).then((result) => {
            setItems(result);
        });
    };

    return (
        <div>
            <Switch>
                <Route
                    path={ROUTES.SEARCH}
                    render={(propss) => (
                        <SearchPage
                            {...propss}
                            items={items}
                            onSearch={queryItems}
                        />
                    )}
                />
            </Switch>
            <MainNavBar activeIcon="search" />
        </div>
    );
};

export const Borrow = withFirebase(BorrowItems);
