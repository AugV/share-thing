import React from 'react';
import { ItemPreview } from '../../Entities/Interfaces';
import { ListItem } from './ListItem';
import Spinner from 'react-bootstrap/Spinner';
import './list-item.css';
import { Typography } from 'antd';
import {
    ExclamationOutlined,
  } from '@ant-design/icons';

interface ListProps {
    itemList: ItemPreview[];
    renderItemDetails?: (content: string | Date) => JSX.Element;
    onClickItem: (id: string) => void;
}

const ListComponent: React.FC<ListProps> = (props) => {
    const { itemList } = props;
    const arrayEmpty = itemList.length === 0;

    return(
        <div className="list">
            {!itemList && <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>}
            {arrayEmpty
                ? (
                    <div className="no-item-message">
                        <ExclamationOutlined />
                        <Typography>
                            No items to display
                        </Typography>
                    </div>
                )
                : itemList && itemList.map((item) => (
                    <ListItem
                                key={item.id}
                                itemData={item}
                                renderItemDetails={props.renderItemDetails || undefined}
                                onClickItem={props.onClickItem}
                    />
                ))
            }
        </div>
    ) ;
};

export const List = ListComponent;
