import React from 'react';
import { withAuthorization } from '../Utils';
import Firebase from '../Firebase';
import {
  Spinner,
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ItemModel } from '../Entities/Interfaces';

const condition = (authUser: object) => !!authUser;

interface PublicScreenTemplate {
    unsubscribe: () => void;
}

interface Props {
    firebase: Firebase;
}

interface State {
    loading: boolean;
    items: ItemModel[];
}

class PublicScreenTemplate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            items: [],
        };
    }

    public componentDidMount(): void {
        this.setState({ loading: true });

        this.unsubscribe = this.props.firebase.getItems().onSnapshot(snapshot => {
            this.setState(
                {
                    loading: false,
                    // items: snapshot.docs.map(docToItem),
                },
      );
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }

    public render(): React.ReactNode {
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
                          <img src={item.images[0]} alt="" style={{ maxHeight: 100, height: 'auto' }}/>
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

export const PublicScreen = withAuthorization(condition)(PublicScreenTemplate);
