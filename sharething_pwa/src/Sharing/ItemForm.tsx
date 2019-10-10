import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";
import { Item } from "../Entities/Iterfaces";

const INITIAL_STATE: State = {
  item: { id: "", name: "", description: "" }
};

interface Props {
  firebase: Firebase;
  item: Item;
  history: history.History;
}

interface State {
  item: Item;
  // [key: string]: any;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props };
    console.log("ItemForm LOADED");
    console.log(props.history);
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    console.log(name + event.target.value);
    this.setState({ item: { ...this.state.item, [name]: event.target.value } });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .pushItem(
        this.state.item.id,
        this.state.item.name,
        this.state.item.description
      )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      });
    event.preventDefault();
  };

  render() {
      console.log(this.state.item.name);
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            placeholder="Enter Item name"
            name="name"
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Item description</Form.Label>
          <Form.Control
            placeholder="Enter Item description"
            name="description"
            onChange={this.onChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={this.state.item.name ? false : true}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default ItemForm;
