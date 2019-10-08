import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter, Switch, Route } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";
import ItemForm from "./ItemForm";
import { Item } from "../Entities/Iterfaces";

const INITIAL_STATE: State = {
  itemName: "",
  itemDescription: "",
  item: null
};

interface Props {
  firebase: Firebase;
  location: any;
  history: history.History;
  itemId: string | null;
}

interface State {
  itemName: string;
  itemDescription: string;
  [key: string]: any;
  item: Item | null;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
    // this.loadItem();
  }

  componentDidMount() {
    if (this.props.location.state) this.loadItem();
  }

  loadItem = () => {
    let itemId: string = this.props.location.state.itemId;
    this.props.firebase
      .getItem(itemId)
      .then(item => {
        this.setState({ item: item });
      })
      .catch(error => console.log(error));
  };

  onSubmit(/* event: FormEvent<HTMLFormElement> */) {
    console.log(
      this.props.itemId,
      this.state.itemName,
      this.state.itemDescription
    );
    this.props.firebase
      .pushItem(
        this.props.itemId,
        this.state.itemName,
        this.state.itemDescription
      )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      });
    // event.preventDefault();
  }

  render() {
    return (
      <Switch>
        <Route
          path={ROUTES.ADD_ITEM}
          component={() => (
            <ItemForm
              onSubmit={() => {
                this.onSubmit();
              }}
              item={{ id: "", name: "", description: "" }}
            />
          )}
        />
        {this.state.item && (
          <Route
            path={ROUTES.EDIT_ITEM}
            component={() => (
              <ItemForm
                onSubmit={() => {
                  this.onSubmit();
                }}
                item={this.state.item!}
              />
            )}
          />
        )}
      </Switch>
    );
  }
}

export default withRouter(withFirebase(AddItemScreen));
