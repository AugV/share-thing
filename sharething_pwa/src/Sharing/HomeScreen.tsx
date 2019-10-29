import React from "react";
import { withAuthorization } from "../Session";
import Item from "../Entities/Item";
import Firebase from "../Firebase";
import {
  Spinner,
  Button,
  Accordion,
  Card,
  Image,
  Container,
  Col,
  Row
} from "react-bootstrap";
import * as ROUTES from "../Constants/Routes";
import history from "history";
import { Link } from "react-router-dom";

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
  url: string;
}

class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      items: [],
      url: ""
    };
  }

  documentToItem = (document: firebase.firestore.QueryDocumentSnapshot) => {
    let item: Item = new Item();
    item.setValuesFromDoc(document);
    return item;
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .getUserItems()
      .onSnapshot(snapshot => {
        this.setState({
          loading: false,
          items: snapshot.docs.map(this.documentToItem)
        });
      });

    this.props.firebase.getItemImg().then(url => {
      this.setState({ url: url });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addItem = () => {
    this.props.history.push(ROUTES.ADD_ITEM);
  };

  onClickDelete = (itemId: string) => {
    this.props.firebase.deleteItem(itemId);
  };

  render() {
    const { items, loading } = this.state;

    return (
      <div className="container">
        <div style={{ float: "right" }}>
          <Button type="button" onClick={this.props.firebase.signOut}>
            Sign Out
          </Button>
        </div>
        <h1>Home Screen</h1>
        <div>
          {loading && <Spinner animation="border" />}
          <Accordion>
            {items.map((item, index) => (
              <Card key={item.id}>
                <Card.Header>
                  <Accordion.Toggle as={Card.Body} eventKey={index.toString()}>
                    <Container>
                      <Row>
                        <Col>
                          <Image src={this.state.url} fluid />
                        </Col>
                        <Col>
                          <Card.Text>{item.name}</Card.Text>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>
                          <Link to={`item/${item.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="primary"
                            onClick={() => this.onClickDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
        <Button onClick={this.addItem}>Add Item</Button>
      </div>
    );
  }
}

export { HomeScreen };
export default withAuthorization(condition)(HomeScreen);
