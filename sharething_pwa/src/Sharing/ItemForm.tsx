import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";

interface Props {
    onSubmit():void
}

class ItemForm extends React.Component<Props, State>{
constructor(props:Props) {
    super(props);
    
}
render() {
    return (
      <Form onSubmit={this.onSubmit}>
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

  export default ItemForm;