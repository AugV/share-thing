import React from 'react';
import { SharegreementModel } from '../../Entities/Interfaces';
import Title from 'antd/lib/typography/Title';
import { Row, Col } from 'antd';
import { SharegreementActions } from './SharegreementActions';

interface SharegDetailsProps {
    sharegData: SharegreementModel;
}

const SharegreementDetails: React.FC<SharegDetailsProps> = (props) => {
    const { sharegData } = props;

    return(
        <div>
            <Title level={3}>{sharegData.itemName}</Title>
            <Row>
                <Col span={6}>Owner:</Col>
                <Col span={6}>{sharegData.owner}</Col>
            </Row>
            <Row>
                <Col span={6}>Borrower:</Col>
                <Col span={6}>{sharegData.borrower}</Col>
            </Row>
            <Row>
                <Col span={6}>Start:</Col>
                <Col span={6}>{sharegData.startDate}</Col>
            </Row>
            <Row>
                <Col span={6}>End:</Col>
                <Col span={6}>{sharegData.endDate}</Col>
            </Row>
            <SharegreementActions status={sharegData.status} role={sharegData.role!}/>

        </div>
    );
};

export { SharegreementDetails };
