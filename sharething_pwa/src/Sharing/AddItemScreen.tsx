import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";

const INITIAL_STATE: State = {
  itemName: "",
  itemDescription: ""
  //   buttonIsActive: false
};

interface Props {
  firebase: Firebase;
  history: history.History;
}

interface State {
  itemName: string;
  itemDescription: string;
  [key: string]: any;
  //   buttonIsActive: boolean;
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
}

export default withRouter(withFirebase(AddItemScreen));
