import React, { useState, useEffect } from 'react';
import { ItemModel } from '../../Entities/Interfaces';
import { useParams, useHistory } from 'react-router-dom';
import { Spin, Carousel, Button, Typography } from 'antd';
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
import i18n from 'i18next';

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
            <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} /> :
            (
                <React.Fragment>
                    <SubPageHeader title={i18n.t('itemDetails')}/>

                        <Carousel style={{ backgroundColor: 'lightgrey' }}>
                            {itemData.images.map(image => (
                                <img className="details-image" key={image} src={image} alt="N/A"/>
                            ))}
                        </Carousel>

                    <div className="details">
                        <Title level={2}>{itemData.name}</Title>

                        <div className="description">
                        <Paragraph ellipsis={{ expandable: true }} >{itemData.description}</Paragraph>
                        </div>

                        {ownerName && <Typography >{i18n.t('ownedBy')}: {ownerName}</Typography>}
                    </div>

                    <Button
                        style={{ maxWidth: '750px', position: 'fixed', bottom: '0', marginTop: '10px' }}
                        size="large"
                        type="primary"
                        block={true}
                        onClick={() => {setModalVisible(true); }}
                    >
                        {i18n.t('requestItem')}
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
