import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../Constants/Routes';
import { ItemForm } from './ItemForm';
import { ItemModel, ItemModelSend } from '../../Entities/Interfaces';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import i18n from 'i18next';

type FetchData = (id?: string | undefined) => Promise<ItemModel>;

const Item: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;
    const history = useHistory();

    const saveItem = (item: ItemModelSend) => {
        firebase.saveItem(item);
        history.push(ROUTES.MY_ITEMS);
    };

    const deleteItem = (id: string) => {
        history.push(ROUTES.MY_ITEMS);
        return firebase.deleteItem(id);
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
                                            pageTitle={i18n.t('addItem')}
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
                                            pageTitle={i18n.t('editItem')}
                                            saveData={saveItem}
                                            deleteData={deleteItem}
                                        />
                                    )}
            />
        </Switch>
    );
};

export const ItemPage = withFirebase(Item);
