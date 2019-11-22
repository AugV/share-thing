import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../Firebase';
import {
  Spinner,
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { docToConvo, Conversation } from '../Entities/Interfaces';
import { Link } from 'react-router-dom';

interface Props {
    firebase: Firebase;
}

const ConvoList = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [conversations, setConversations] = useState<Conversation[] | null>(null);

    useEffect(() => {
        const unsubscribe = props.firebase.getUserConversations().onSnapshot(snapshot => {
            setConversations(snapshot.docs.map(docToConvo)); });
        setLoading(false);
        return unsubscribe;
    }, [props.firebase]);

    return(
      <div>
          {loading && <Spinner animation="border" />}
          {conversations && (
          <Accordion>
            {conversations!.map((conversation, index) => (
              <Card key={conversation.id}>
                <Card.Header>
                  <Container>
                    <Row key={index}>
                      <Col>{conversation.itemName}</Col>
                      <Link to={`messages/${conversation.id}`}>Go to conversation</Link>
                    </Row>
                  </Container>
                </Card.Header>
              </Card>
            ))}
          </Accordion>
          )}
        </div>
    );
};

export const ConvoListScreen = withFirebase(ConvoList);
