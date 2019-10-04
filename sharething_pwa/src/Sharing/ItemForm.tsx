import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";

interface ItemInfo {
  itemId: string;
  itemName: string;
  itemDescription: string;
}

interface Props {
  onSubmit(event:FormEvent<HTMLFormElement>): void;
  item: ItemInfo;
}

interface State {
  itemName: string;
  itemDescription: string;
  [key: string]: any;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {...props.item};
    console.log("ItemForm LOADED");
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="itemName">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            placeholder="Enter Item name"
            name="itemName"
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId="itemDescription">
          <Form.Label>Item description</Form.Label>
          <Form.Control
            placeholder="Enter Item description"
            name="itemDescription"
            onChange={this.onChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={this.state.itemName ? false : true}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default ItemForm;
