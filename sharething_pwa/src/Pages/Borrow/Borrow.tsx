import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { SearchPage } from './Search';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { ItemQuery, ItemPreview } from '../../Entities/Interfaces';
import { BorrowDetails } from './BorrowDetails';

const BorrowItems: React.FC<FirebaseProps> = (props) => {
    const [items, setItems] = useState<ItemPreview[] | undefined>(undefined);

    const queryItems = (query: ItemQuery) => {
        props.firebase.queryItems(query).then((result) => {
            setItems(result);
        });
    };

    const fetchItem = (itemId: string) => {
        return props.firebase.fetchSingleItem(itemId);
    };

    return (
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
                <Route
                    path={ROUTES.BORROW_DETAILS_ID}
                    render={(propss) => (<BorrowDetails getItemData={fetchItem} {...propss}/>)}
                />
            </Switch>
    );
};

export const Borrow = withFirebase(BorrowItems);
