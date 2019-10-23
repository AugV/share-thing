import React, { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { Item } from "../Entities/Iterfaces";
import { withRouter } from "react-router-dom";

const INITIAL_STATE: State = {
  item: {id:"",name:"",description:""}
};

interface Props {
  onSubmit(item: Item): void;
  match: { params: { id: string } };
  loadItem(itemId: string): Promise<Item>;
}

interface State {
  item: Item;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    if (this.props.match.params.id) this.loadItem();
  }

  loadItem() {
    this.props.loadItem(this.props.match.params.id).then(item => {
      this.setState({ item: item });
    });
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
    return (this.state.item&&
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
            value={this.state.item.description}
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={this.state.item ? false : true}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}
//@ts-ignore
export default withRouter(ItemForm);
