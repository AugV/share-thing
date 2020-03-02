import React from 'react';
import { UserOwnedItem } from '../../Entities/Interfaces';
import './list-item.css';

interface ListItemProps {
    itemData: UserOwnedItem;
}

const ListItemComponent: React.FC<ListItemProps> = (props) => (
    <div className="item" key={props.itemData.item_id}>
        <img className="img" src={props.itemData.image_url} />
        <p className="text">{props.itemData.item_name}</p>
    </div>
);

export const ListItem = ListItemComponent;
