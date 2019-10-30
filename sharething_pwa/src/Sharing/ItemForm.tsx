import React, { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { Item } from "../Entities/Iterfaces";
import { withRouter, RouteComponentProps } from "react-router-dom";

const INITIAL_STATE: State = {
  id: "",
  name: "",
  description: "",
  image: null,
  render: false
};

interface OwnProps {
  onSubmit(item: Item, file: File): void;
  loadItem(itemId: string): Promise<Item>;
}

type Props = OwnProps & RouteComponentProps<any>;

interface State {
  id: string;
  name: string;
  description: string;
  image?: File | null;
  render: boolean;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.loadItem();
    } else {
      this.setState({ render: true });
    }
  }

  loadItem() {
    this.props.loadItem(this.props.match.params.id).then(item => {
      this.setState({ ...item, render: true });
    });
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({ ...this.state, [name]: event.target.value });
  };

  onFileChange = (event: any) => {
    this.setState({ image: event.target.files[0] });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const item: Item = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description
    };
    this.props.onSubmit(item, this.state.image!);

    event.preventDefault();
  };

  render() {
    return (
      this.state.render && (
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Item name</Form.Label>
            <Form.Control
              placeholder="Enter Item name"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Item description</Form.Label>
            <Form.Control
              placeholder="Enter Item description"
              name="description"
              onChange={this.onChange}
              value={this.state.description || ""}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Item image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              onChange={this.onFileChange}
              // value={this.state.image}
            />
          </Form.Group>

          <Button variant="primary" disabled={!this.state.name} type="submit">
            Submit
          </Button>
        </Form>
      )
    );
  }
}

export default withRouter(ItemForm);
