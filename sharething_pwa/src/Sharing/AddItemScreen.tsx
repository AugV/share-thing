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
}

interface State {
  [key: string]: any;
  item: Item | null;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  
  componentDidMount() {
    if (this.props.location.state) this.loadItem();
  }

  loadItem = () => {
    let itemId: string = this.props.location.state.itemId;
    this.props.firebase
      .getItem(itemId)
      .then(item => {
        item.id = itemId;
        this.setState({ item: item });
      })
      .catch(error => console.log(error));
  };

  // onSubmit(event: FormEvent<HTMLFormElement>) {
  //   console.log("DATA: " + this.state.item!.name + this.state.item!.description);
  //   this.props.firebase
  //     .pushItem(
  //       this.props.location.state.itemId,
  //       this.state.item!.name,
  //       this.state.item!.description
  //     )
  //     .then(() => {
  //       this.setState({ ...INITIAL_STATE });
  //       this.props.history.push(ROUTES.HOME);
  //     });
  //   event.preventDefault();
  // }

  render() {
    return (
      <Switch>
        <Route
          path={ROUTES.ADD_ITEM}
          component={() => (
            <ItemForm firebase={this.props.firebase} history={this.props.history}
              item={{ id: "", name: "", description: "" }}
            />
          )}
        />
        {this.state.item && (
          <Route
            path={ROUTES.EDIT_ITEM}
            component={() => (
              <ItemForm firebase={this.props.firebase} history={this.props.history}
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
