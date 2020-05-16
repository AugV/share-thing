import React from 'react';
import {
  Accordion,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { SharegResponse } from '../../Entities/Interfaces';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface Props {
    sharegreements: SharegResponse[];
}

const SharegreementList: React.FC<Props> = (props) => {
    const history = useHistory();

    const onClick = (id: string) => {
        // history.push(`${ROUTES.SHAREGREEMENT}/${id}`);
    };

    return(
        <Accordion>
        {props.sharegreements!.map((shareg, index) => (
        <Card key={shareg.id}>
            <Card.Header>
            <Container>
                <Row key={index} onClick={() => {onClick(shareg.id); }}>
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
