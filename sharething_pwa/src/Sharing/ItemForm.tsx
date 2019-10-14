import React, { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import { Item } from "../Entities/Iterfaces";
import { match, withRouter } from "react-router-dom";

const INITIAL_STATE: State = {
  item: null
};

//TODO: pass loadItem() here
interface Props {
  onSubmit(item: Item): void;
  match:match;
  loadItem(itemId:string):Promise<string>;
}

interface State {
  item: Item|null;
  [key: string]: any;
}

class ItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // this.state = { item: props.item };
    this.state=INITIAL_STATE;
    console.log("LOADED ItemForm")
  }

  componentDidMount() {
    console.log(this.props);
    //  if (this.props.match.params.id.exists) this.loadItem();
  }
  
  loadItem() {
    //@ts-ignore
    this.props.loadItem(this.props.match.params.id);
  }

  onChange = (event: any) => {
    const name = event.target.name as string;
    // this.setState({ item: { ...this.state.item, [name]: event.target.value } });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // this.props.onSubmit(this.state.item);
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
            // value={this.state.item.name}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Item description</Form.Label>
          <Form.Control
            placeholder="Enter Item description"
            name="description"
            onChange={this.onChange}
            // value={this.state.item.description}
          />
        </Form.Group>

        <Button
          variant="primary"
          // disabled={this.state.item.name ? false : true}
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
