import React, { useState, useEffect } from 'react';
import { ItemModel } from '../../Entities/Interfaces';
import { useParams, useHistory } from 'react-router-dom';
import { Spin, Carousel, Button } from 'antd';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import './borrow-details.css';

import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { DateModal } from '../Sharegreement/DateDialog';
import { DateRange } from '../../Entities/Types';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { withFirebase } from '../../Firebase';
import { toSharegCreateReq } from '../../Entities/Mappers';
import * as NAMES from '../../Constants/Routes';

interface BorrowDetailsProps {
    getItemData: (id: string) => Promise<ItemModel>;
}

const BorrowDetailsPage: React.FC<BorrowDetailsProps & FirebaseProps> = (props) => {
    const { getItemData, firebase } = props;
    const [itemData, setItemData] = useState<ItemModel | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const itemId = id;
        if (typeof itemId === 'string') {
            getItemData(itemId).then(item => setItemData(item));
        }
    }, [id, getItemData]);

    const closeModal = () => {
        setModalVisible(false);
    };

    const createSharegreement = (dates: DateRange) => {
        firebase.createSharegreement(toSharegCreateReq(itemData!, dates))
        .then(sharegreementId => {
            history.push(`${NAMES.SHAREGREEMENT}/${sharegreementId}`);
        });
    };

    return(
        <div>
        <SubPageHeader title="Overview"/>
        {!itemData ?
            <Spin/> :
        (
            <React.Fragment>
                <Carousel>
                    {itemData.images.map(image => (
                        <img key={image} src={image} alt="N/A"/>
                    ))}
                </Carousel>
                <Title level={3}>{itemData.name}</Title>
                <div className="description">
                <Paragraph ellipsis={{ expandable: true }} >{itemData.description}</Paragraph>
                </div>
                <Title level={4}>Owner: {itemData.owner}</Title>
                <Button
                        style={{ position: 'fixed', bottom: '0', marginTop: '10px' }}
                        size="large"
                        type="primary"
                        block={true}
                        onClick={() => {setModalVisible(true); }}
                >
                    Request Item
                </Button>
            </React.Fragment>
        )
        }
        <DateModal
            visible={modalVisible}
            closeModal={closeModal}
            onModalSubmit={createSharegreement}
        />
        </div>
    );
};

export const BorrowDetails = withFirebase(BorrowDetailsPage);
