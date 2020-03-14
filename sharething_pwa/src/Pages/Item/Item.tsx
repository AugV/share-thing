import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../Constants/Routes';
import { ItemForm } from './ItemForm';
import { ItemModel, ItemModelSend } from '../../Entities/Interfaces';
import { FirebaseProps } from '../../Entities/PropsInterfaces';

type FetchData = (id?: string | undefined) => Promise<ItemModel>;

const Item: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const saveItem = (item: ItemModelSend) => {
        firebase.saveItem(item);
    };

    const initialData = async () => {
        const item: ItemModel = {
            id: '',
            name: '',
            owner: '',
            description: '',
            images: [],
            borrowed: false,
            borrowed_date: [],
            groups: [],
        };

        return item;
    };

    const fetchItem = (id: string) => {
        return firebase.fetchSingleItem(id);
    };

    return(
        <Switch>
            <Route
                path={ROUTES.ADD_ITEM}
                render={(propss) => (
                                        <ItemForm
                                            {...propss}
                                            fetchData={initialData}
                                            pageTitle={'Add Item'}
                                            saveData={saveItem}
                                        />
                                    )}
            />
            <Route
                path={ROUTES.EDIT_ITEM_ID}
                render={(propss) => (
                                        <ItemForm
                                            {...propss}
                                            fetchData={fetchItem as FetchData}
                                            pageTitle={'Edit Item'}
                                            saveData={saveItem}
                                        />
                                    )}
            />
        </Switch>
    );
};

export const ItemPage = withFirebase(Item);
