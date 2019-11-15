import React from 'react';
import Firebase from '../Firebase';
import {
  Spinner,
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { docToItem } from '../Entities/Interfaces';

interface Conversation {
    id: string;
    itemId: string;
    itemImg: string;
    ownerId: string;
    seekerId: string;
}

interface MessagesScreen {
    unsubscribe: () => void;
}

interface Props {
    firebase: Firebase;
}

interface State {
    loading: boolean;
    conversations: Conversation[];
}

export class ConversationList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            conversations: [],
        };
    }

    public componentDidMount(): void {
        this.setState({ loading: true });

        this.unsubscribe = this.props.firebase.getItems().onSnapshot(snapshot => {
            this.setState(
                {
                    loading: false,
                    conversations: snapshot.docs.map(docToItem),
                },
      );
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }

    public render(): React.ReactNode {
        const { conversations, loading } = this.state;

        return (
        <div>
          {loading && <Spinner animation="border" />}
          <Accordion>
            {converstations.map((conversation, index) => (
              <Card key={conversation.id}>
                <Card.Header>
                  <Container>
                    <Row>
                      <Col/>
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

export const ConversationsScreen = ConversationList;
