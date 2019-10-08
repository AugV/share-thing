import React, { FormEvent } from "react";
import { withFirebase } from "../Firebase";
import { withRouter, Switch, Route } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Firebase from "../Firebase";
import history from "history";
import * as ROUTES from "../Constants/Routes";
import ItemForm from "./ItemForm";
import { Item } from "../Entities/Iterfaces";

const INITIAL_STATE: State = {
  itemName: "",
  itemDescription: "",
  item: { id: "NA", name: "NA", description: "NA" }
};

interface Props {
  firebase: Firebase;
  location: any;
  history: history.History;
  itemId: string;
}

interface State {
  itemName: string;
  itemDescription: string;
  [key: string]: any;
  item: Item;
}

class AddItemScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(){
    this.setState({item:this.fetchItem()})
  }


  onChange = (event: any) => {
    const name = event.target.name as string;
    this.setState({
      [name]: event.target.value
    });
  };

  fetchItem = () => {
    let itemId: string = this.props.location.state.itemId;
    let item: Item = this.props.firebase.getItem(itemId);
    console.log(item.name + "TESTETSTST" + item.description);
    return { id: "", name: "", description: "" };
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
      <Switch>
        <Route path={ROUTES.ADD_ITEM} component={ItemForm} />
        <Route
          path={ROUTES.EDIT_ITEM}
          component={() => (
            <ItemForm onSubmit={this.onSubmit} item={this.state} />
          )}
        />
      </Switch>

      // <ItemForm onSubmit={this.onSubmit} item={}></ItemForm>
      // <Form onSubmit={this.onSubmit}>
      //   <Form.Group controlId="itemName">
      //     <Form.Label>Item name</Form.Label>
      //     <Form.Control
      //       placeholder="Enter Item name"
      //       name="itemName"
      //       onChange={this.onChange}
      //     />
      //   </Form.Group>

      //   <Form.Group controlId="itemDescription">
      //     <Form.Label>Item description</Form.Label>
      //     <Form.Control
      //       placeholder="Enter Item description"
      //       name="itemDescription"
      //       onChange={this.onChange}
      //     />
      //   </Form.Group>

      //   <Button
      //     variant="primary"
      //     disabled={this.state.itemName ? false : true}
      //     type="submit"
      //   >
      //     Submit
      //   </Button>
      // </Form>
    );
  }
}

export default withRouter(withFirebase(AddItemScreen));
