import React from 'react';
import { SharegResponse } from '../../Entities/Interfaces';
import Title from 'antd/lib/typography/Title';
import { Row, Col } from 'antd';
import { OwnerActions } from './OwnerActions';
import { BorrowerActions } from './BorrowerActions';
import i18n from 'i18next';

interface SharegDetailsProps {
    sharegData: SharegResponse;
}

const SharegreementDetails: React.FC<SharegDetailsProps> = (props) => {
    const { sharegData } = props;

    return(
        <div>
            <Title level={3}>{sharegData.itemName}</Title>
            <Row>
                <Col span={6}>{i18n.t('owner')}:</Col>
                <Col span={6}>{sharegData.owner.name}</Col>
            </Row>
            <Row>
                <Col span={6}>{i18n.t('borrower')}:</Col>
                <Col span={6}>{sharegData.borrower.name}</Col>
            </Row>
            <Row>
                <Col span={6}>{i18n.t('startDate')}:</Col>
                <Col span={6}>{sharegData.startDate}</Col>
            </Row>
            <Row>
                <Col span={6}>{i18n.t('endDate')}:</Col>
                <Col span={6}>{sharegData.endDate}</Col>
            </Row>
            {sharegData.role === 'owner' && <OwnerActions shareg={sharegData} status={sharegData.status} />}
            {sharegData.role === 'borrower' && <BorrowerActions shareg={sharegData} status={sharegData.status} />}
        </div>
    );
};

export { SharegreementDetails };
