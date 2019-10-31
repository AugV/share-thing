import React from 'react';
import { withAuthorization } from '../Session';
import Firebase from '../Firebase';
import {
  Spinner,
  Accordion,
  Card,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Item, docToItem } from '../Entities/Iterfaces';

const condition = (authUser: object) => !!authUser;

interface PublicScreen {
    unsubscribe: () => void;
}

interface Props {
    firebase: Firebase;
}

interface State {
    loading: boolean;
    items: Item[];
}

class PublicScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            items: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.unsubscribe = this.props.firebase.getItems().onSnapshot(snapshot => {
            this.setState(
                {
                    loading: false,
                    items: snapshot.docs.map(docToItem),
                },
      );
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { items, loading } = this.state;

        return (
        <div>
          {loading && <Spinner animation="border" />}
          <Accordion>
            {items.map((item, index) => (
              <Card key={item.id}>
                <Card.Header>
                  <Container>
                    <Row>
                      <Col>
                        <Link to={`item/${item.id}/details`}>
                          <Image src={require('../test-img.png')} />
                        </Link>
                      </Col>
                      <Col>
                        <Card.Text>{item.name}</Card.Text>
                      </Col>
                    </Row>
                  </Container>
                </Card.Header>
              </Card>
            ))}
          </Accordion>
        </div>
        );
    }
}

export { PublicScreen };
export default withAuthorization(condition)(PublicScreen);
