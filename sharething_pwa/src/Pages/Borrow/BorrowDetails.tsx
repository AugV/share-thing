import React, { useState, useEffect } from 'react';
import { ItemModel } from '../../Entities/Interfaces';
import { useParams, useHistory } from 'react-router-dom';
import { Spin, Carousel, Button } from 'antd';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import './borrow-details.css';

import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { DateModal } from '../../Components/DatePicker/DateModal';
import { DateRange } from '../../Entities/Types';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { withFirebase } from '../../Firebase';
import { toSharegCreateReq } from '../../Entities/Mappers';
import * as NAMES from '../../Constants/Routes';
import { DateRangePicker } from 'rsuite';

interface BorrowDetailsProps {
    getItemData: (id: string) => Promise<ItemModel>;
    getOwnerName: (userId: string) => Promise<string>;
}

const BorrowDetailsPage: React.FC<BorrowDetailsProps & FirebaseProps> = (props) => {
    const { getItemData, getOwnerName, firebase } = props;
    const [itemData, setItemData] = useState<ItemModel | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [ownerName, setOwnername] = useState<string | undefined>(undefined);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const itemId = id;
        if (typeof itemId === 'string') {
            getItemData(itemId).then(item => {
                setItemData(item);
                getOwnerName(item.owner).then(name => {
                    setOwnername(name);
                });
            });
        }
    }, [id, getItemData, getOwnerName]);

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
        {!itemData ?
            <Spin/> :
            (
                <React.Fragment>
                    <SubPageHeader title="Item Details"/>

                    <Carousel>
                        {itemData.images.map(image => (
                            <img key={image} src={image} alt="N/A"/>
                        ))}
                    </Carousel>

                    <div className="details">
                        <Title level={1}>{itemData.name}</Title>

                        <div className="description">
                        <Paragraph ellipsis={{ expandable: true }} >{itemData.description}</Paragraph>
                        </div>

                        {ownerName && <Title level={4}>owned by: {ownerName}</Title>}
                    </div>

                    <Button
                        style={{ maxWidth: '750px', position: 'fixed', bottom: '0', marginTop: '10px' }}
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
