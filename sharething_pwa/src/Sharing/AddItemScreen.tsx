import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter, Switch, Route, match } from "react-router-dom";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";
import ItemForm from "./ItemForm";
import { Item } from "../Entities/Iterfaces";

const INITIAL_STATE: State = {
  item: null
};

interface Props {
  firebase: Firebase;
  location: any;
  history: history.History;
}

interface State {
  item: Item | null;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
    console.log("LOADED");
  }

  componentDidMount() {
    console.log(this.props);
    // if (true) this.loadItem();
  }

  loadItem = (itemId: string) => {
    new Promise(resolve => {
      this.props.firebase
        .getItem(itemId)
        .then(item => {
          // this.setState({ item: item });
          resolve(item);
        })
        .catch(error => console.log(error));
    });
  };

  onSubmit = (item: Item) => {
    this.props.firebase.pushItem(item).then(() => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    });
  };

  render() {
    return (
      <Switch>
        <Route
          path={ROUTES.ADD_ITEM}
          component={() => (
            <ItemForm onSubmit={this.onSubmit} loadItem={this.loadItem} />
          )}
        />
        {!this.state.item && (
          <Route
            path={ROUTES.EDIT_ITEM}
            component={() => (
              <ItemForm onSubmit={this.onSubmit} loadItem={this.loadItem} />
            )}
          />
        )}
      </Switch>
    );
  }
}

export default withRouter(withFirebase(AddItemScreen));
