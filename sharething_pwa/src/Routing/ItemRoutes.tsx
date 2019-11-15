import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Firebase, { withFirebase } from '../Firebase';
import history from 'history';
import * as ROUTES from '../Constants/Routes';
import { ItemForm } from '../Sharing/ItemForm';
import ItemDetails from '../Sharing/ItemDetails';
import { Item } from '../Entities/Iterfaces';

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

class ItemController extends React.Component<Props, State> {
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
            <ItemDetails loadItem={this.loadItem} />
          )}
        />
      </Switch>
        );
    }
}

export default withRouter(withFirebase(ItemController));
