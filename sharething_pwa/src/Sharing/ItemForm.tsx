import React, { FormEvent } from "react";
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
  onSubmit(item: Item): void;
}

interface State {
  item: Item;
  [key: string]: any;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { item: props.item };
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({ item: { ...this.state.item, [name]: event.target.value } });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    this.props.onSubmit(this.state.item);
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            placeholder="Enter Item name"
            name="name"
            onChange={this.onChange}
            value={this.state.item.name}
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
