import React, { useState, useEffect } from 'react';
import { ItemModel } from '../../Entities/Interfaces';
import { useParams } from 'react-router-dom';
import { Spin, Carousel, Button } from 'antd';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import './borrow-details.css';

import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { DateModal } from '../Sharegreement/DateDialog';
import { DateRange } from '../../Entities/Types';

interface BorrowDetailsProps {
    getItemData: (id: string) => Promise<ItemModel>;
}

const BorrowDetails: React.FC<BorrowDetailsProps> = (props) => {
    const [itemData, setItemData] = useState<ItemModel | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        const itemId = id;
        if (typeof itemId === 'string') {
            props.getItemData(itemId).then(item => setItemData(item));
        }
    }, [id]);

    const closeModal = () => {
        setModalVisible(false);
    };

    const createSharegreement = (dates: DateRange) => {

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
                        <img key={image} src={image}/>
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

export { BorrowDetails };
