import React from 'react';
import {
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { ConversationInfo } from '../../Entities/Interfaces';
import { Link } from 'react-router-dom';

interface Props {
    conversations: ConversationInfo[];
}

const ConvoListComponent = (props: Props) => {

    return(
        <Accordion>
        {props.conversations!.map((conversation, index) => (
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
    );
};

export const ConvoList = ConvoListComponent;
