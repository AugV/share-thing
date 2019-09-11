<<<<<<< HEAD
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
=======
import React, { Component, FormEvent } from 'react';
import { withFirebase } from '../Firebase';
import { Form, Button, FormControlProps, FormControl } from 'react-bootstrap';
import Firebase from '../Firebase';


interface Props {
    firebase: Firebase
}

interface State {
    itemName: string,
    itemDescription: string;
}

class AddItemScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: ''
        }
    }

    onChangeName = (event: React.FormEvent<FormControlProps & FormControl>) => {
        let input = event.target as HTMLInputElement;
        this.setState({ itemName: input.value });
    }

    onChangeDescription = (event: React.FormEvent<FormControlProps & FormControl>) => {
        let input = event.target as HTMLInputElement;
        this.setState({ itemDescription: input.value });
    }

    onSubmit = (event: FormEvent<HTMLFormElement>) => {
        this.props.firebase.pushItem(this.state.itemName, this.state.itemDescription);
        event.preventDefault();
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="itemName">
                    <Form.Label>Item name</Form.Label>
                    <Form.Control placeholder="Enter Item name" name="itemName" onChange={this.onChangeName} />
                </Form.Group>

                <Form.Group controlId="itemDescription">
                    <Form.Label>Item description</Form.Label>
                    <Form.Control placeholder="Enter Item description" name="itemDescription" onChange={this.onChangeDescription} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
          </Button>
                {/* {error && <p>{error.message}</p>} */}
            </Form>
        )
    }

}

export default withFirebase(AddItemScreen);
>>>>>>> 4b497add1bf50236809ef4dec66b24cff07162bd
