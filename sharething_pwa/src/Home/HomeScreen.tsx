import React from "react";
import SignOutButton from "../Authentication/SignOut";
import { withAuthorization } from "../Session";
import Item from "../Item/Item";
import Firebase from "../Firebase";
import { ListGroup, Spinner, Button } from "react-bootstrap";
import * as ROUTES from "../Constants/Routes";
import history from "history";

const condition = (authUser: object) => !!authUser;

interface HomeScreen {
  unsubscribe: () => void;
}

interface Props {
  firebase: Firebase;
  history: history.History;
}

interface State {
  loading: boolean;
  items: Item[];
}

class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(this.props);
    this.state = {
      loading: false,
      items: []
    };
  }

  documentToItem = (document: firebase.firestore.QueryDocumentSnapshot) => {
    let item: Item = new Item(document);
    return item;
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .getUserItems()
      .onSnapshot(snapshot => {
        this.setState(
          {
            loading: false,
            items: snapshot.docs.map(this.documentToItem)
          },
        );
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  routeChange = () => {
    this.props.history.push(ROUTES.ADD_ITEM);
  };

  render() {
    const { items, loading } = this.state;

    return (
      <div className="container">
        <h1>Home Screen</h1>
        <h2>Welcome</h2>
        <SignOutButton />
        <div>
          {loading && <Spinner animation="border" />}
          <ListGroup>
            {items.map(item => (
              <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <Button onClick={this.routeChange}>Add Item</Button>
      </div>
    );
  }
}

export { HomeScreen };
export default withAuthorization(condition)(HomeScreen);
