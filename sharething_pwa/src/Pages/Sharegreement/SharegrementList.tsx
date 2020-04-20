import React from 'react';
import {
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { SharegreementModel } from '../../Entities/Interfaces';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface Props {
    sharegreements: SharegreementModel[];
}

const SharegreementList: React.FC<Props> = (props) => {

    return(
        <Accordion>
        {props.sharegreements!.map((shareg, index) => (
        <Card key={shareg.id}>
            <Card.Header>
            <Container>
                <Row key={index}>
                <Col>{shareg.itemName}</Col>
                <Link to={`${ROUTES.SHAREGREEMENT}/${shareg.id}`}>Go to sharegreement</Link>
                </Row>
            </Container>
            </Card.Header>
        </Card>
        ))}
        </Accordion>
    );
};

export { SharegreementList };
