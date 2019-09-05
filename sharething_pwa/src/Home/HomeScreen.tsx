import React from 'react';
import SignOutButton from '../Authentication/SignOut';
import { withAuthorization } from "../Session";
import Item from '../Item/Item';
import Firebase from '../Firebase';
import { ListGroup, Spinner } from 'react-bootstrap';


const condition = (authUser: object) => !!authUser;

interface HomeScreen {
  unsubscribe: () => void;
}

interface Props {
  firebase: Firebase;
}

interface State {
  loading: boolean;
  items: Item[];
}


class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      items: []
    };
  }

  documentToItem = (document: firebase.firestore.QueryDocumentSnapshot) => {
    let item: Item = new Item(document);
    return item;
  }

  componentDidMount() {
    this.setState({ loading: true });
    let items = new Map<string, Item>();
    this.unsubscribe = this.props.firebase.getItems().onSnapshot(snapshot => {
      // snapshot.forEach(doc => {
      //   console.log(doc);
      //   console.log(items.size);
      //   items.set(doc.id, this.documentToItem(doc));
      //   console.log(items.size);
      // });
      this.setState({
        loading: false,
        // items: Array.from(items.values()),
        items: snapshot.docs.map(this.documentToItem),
      }, () => { console.log('new state', this.state)});

      console.log('old state', this.state)
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
      </div>
    )
  }
}

export { HomeScreen };
export default withAuthorization(condition)(HomeScreen);