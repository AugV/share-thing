import React from "react";
import { withAuthorization } from "../Session";
import Item from "../Entities/Item";
import Firebase from "../Firebase";
import {
  ListGroup,
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
        this.setState({
          loading: false,
          items: snapshot.docs.map(this.documentToItem)
        });
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
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Card.Body} eventKey={index.toString()}>
                    <Container>
                      <Row>
                        <Col>
                          <Image src={require("../test-img.png")} />
                        </Col>
                        <Col>
                          <Card.Text>{item.name}</Card.Text>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
        <Button onClick={this.routeChange}>Add Item</Button>
      </div>
    );
  }
}

export { HomeScreen };
export default withAuthorization(condition)(HomeScreen);
