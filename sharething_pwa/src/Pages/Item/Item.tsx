import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Firebase, { withFirebase } from '../../Firebase';
import history from 'history';
import * as ROUTES from '../../Constants/Routes';
import { ItemForm } from './ItemForm';
import { ItemDetails } from './ItemDetails';
import { Item } from '../../Entities/Interfaces';

const INITIAL_STATE: State = {
    item: null,
};

interface Props {
    firebase: Firebase;
    location: any;
    history: history.History;
}

interface State {
    item: Item | null;
}

class ItemRouterComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    public loadItem = (itemId: string) => {
        return new Promise<Item>(resolve => {
            this.props.firebase
        .getItem(itemId)
        .then(item => {
            resolve(item);
        })
        .catch(error => console.log(error));
        });
    };

    public saveItem = (item: Item, file: File) => {
        this.props.firebase.saveItem(item, file).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        });
    };

    public createConvo = (item: Item) => {
        this.props.firebase.createNewConversation(item).then((convoId) => {
            this.props.history.push(`/private/messages/${convoId}`);
        },
        );
    };

    public render(): React.ReactNode {
        return (
      <Switch>
        <Route
          path={ROUTES.ADD_ITEM}
          component={() => (
            <ItemForm onSubmit={this.saveItem} loadItem={this.loadItem} />
          )}
        />
        <Route
          path={ROUTES.EDIT_ITEM}
          component={() => (
            <ItemForm onSubmit={this.saveItem} loadItem={this.loadItem} />
          )}
        />
        <Route
          path={ROUTES.ITEM_DETAILS}
          component={() => (
            <ItemDetails loadItem={this.loadItem} createConvo={this.createConvo}/>
          )}
        />
      </Switch>
        );
    }
}

export const ItemRouter = withRouter(withFirebase(ItemRouterComponent));
