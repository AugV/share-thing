import React, { ComponentLifecycle } from "react";
import { Form, Button } from "react-bootstrap";


class AddItemScreen extends React.Component{
  itemName: string;
  itemDescription: string;
  constructor() {
    super({});
    this.itemName = "";
    this.itemDescription = "";
  }


  render() {
    return (
      <Form /* onSubmit={this.onSubmit} */>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter name"
            // onChange={this.itemName = name}
            value={this.itemName}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Item description</Form.Label>
          <Form.Control
            name="description"
            placeholder="Item description"
            // onChange={this.itemDescription = description}
            value={this.itemDescription}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirm
        </Button>
        {/* {error && <p>{error.message}</p>} */}
      </Form>
    );
  }
}

export default AddItemScreen;