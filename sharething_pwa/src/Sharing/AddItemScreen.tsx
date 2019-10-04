import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter, Switch, Route } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";
import ItemForm from "./ItemForm";
import { Item } from "react-bootstrap/lib/Carousel";

const INITIAL_STATE: State = {
  itemName: "",
  itemDescription: ""
};

interface Props {
  firebase: Firebase;
  location: any;
  history: history.History;
  itemId: string;
}

interface State {
  itemName: string;
  itemDescription: string;
  [key: string]: any;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({
      [name]: event.target.value
    });
  };

  fetchItem = () => {
    let docSnap = this.props.firebase.getItem(this.props.location.state.itemId);
    return { itemId: "yes", itemName: "nameYes", itemDescription: "yesdDEsc" };
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .pushItem(this.state.itemName, this.state.itemDescription)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Switch>
        <Route path={ROUTES.ADD_ITEM} component={ItemForm} />
        <Route
          path={ROUTES.EDIT_ITEM}
          component={() => (
            <ItemForm onSubmit={this.onSubmit} item={this.fetchItem()} />
          )}
        />
      </Switch>

      // <ItemForm onSubmit={this.onSubmit} item={}></ItemForm>
      // <Form onSubmit={this.onSubmit}>
      //   <Form.Group controlId="itemName">
      //     <Form.Label>Item name</Form.Label>
      //     <Form.Control
      //       placeholder="Enter Item name"
      //       name="itemName"
      //       onChange={this.onChange}
      //     />
      //   </Form.Group>

      //   <Form.Group controlId="itemDescription">
      //     <Form.Label>Item description</Form.Label>
      //     <Form.Control
      //       placeholder="Enter Item description"
      //       name="itemDescription"
      //       onChange={this.onChange}
      //     />
      //   </Form.Group>

      //   <Button
      //     variant="primary"
      //     disabled={this.state.itemName ? false : true}
      //     type="submit"
      //   >
      //     Submit
      //   </Button>
      // </Form>
    );
  }
}

export default withRouter(withFirebase(AddItemScreen));
