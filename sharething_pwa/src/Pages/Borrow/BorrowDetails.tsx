import React, { useState, useEffect } from 'react';
import { ItemModel } from '../../Entities/Interfaces';
import {  useParams } from 'react-router-dom';
import { Spin, Carousel, Button } from 'antd';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import Paragraph from 'antd/lib/skeleton/Paragraph';

interface BorrowDetailsProps {
    getItemData: (id: string) => Promise<ItemModel>;
}

const BorrowDetails: React.FC<BorrowDetailsProps> = (props) => {
    const [itemData, setItemData] = useState<ItemModel | undefined>(undefined);
    const { id } = useParams();

    useEffect(() => {
        const itemId = id;
        if (typeof itemId === 'string') {
            props.getItemData(itemId).then(item => setItemData(item));
        }
    }, [id]);

    return(
        <React.Fragment>
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
                <h3>{itemData.name}</h3>
                <Paragraph>{itemData.description}</Paragraph>
                <h3>Owner: {itemData.owner}</h3>
                <Button
                        style={{ position: 'fixed', bottom: '0', marginTop: '10px' }}
                        size="large"
                        type="primary"
                        block={true}
                >
                    Request Item
                </Button>
            </React.Fragment>
        )
        }

        </React.Fragment>
    );
};

export { BorrowDetails };
