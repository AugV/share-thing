import React, { Component, FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { Form, Button, FormControlProps, FormControl } from "react-bootstrap";
import Firebase from "../Firebase";

const INITIAL_STATE: State = {
  itemName: "",
  itemDescription: "",
  error: null
};

interface Props {
  firebase: Firebase;
}

interface State {
  itemName: string;
  itemDescription: string;
  error: string | null;
  [key: string]: any;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = (event: any) => {
    // event.target.
    const name = event.target.name as string;
    this.setState({
        [name]: event.target.value
    })
  };

  onChangeDescription = (
    event: React.FormEvent<FormControlProps & FormControl>
  ) => {
    let input = event.target as HTMLInputElement;
    this.setState({ itemDescription: input.value });
  };


  onChangeName = (event: React.FormEvent<FormControlProps & FormControl>) => {
    let input = event.target as HTMLInputElement;
    this.setState({ itemName: input.value });
  };

//   onChangeDescription = (
//     event: React.FormEvent<FormControlProps & FormControl>
//   ) => {
//     let input = event.target as HTMLInputElement;
//     this.setState({ itemDescription: input.value });
//   };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .pushItem(this.state.itemName, this.state.itemDescription)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error: "Could not do" });
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {this.state.error && <p>{this.state.error}</p>}
      </Form>
    );
  }
}

export default withFirebase(AddItemScreen);
