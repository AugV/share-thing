import React from 'react';
import { UserItem } from '../../Entities/Interfaces';
import './list-item.css';

interface ListItemProps {
    itemData: UserItem;
    renderItemDetails?: (content: string | Date) => JSX.Element;
    onClickItem: (id: string) => void;
}

const ListItemComponent: React.FC<ListItemProps> = (props) => {

    return(
    <div className="item" onClick={(e) => props.onClickItem(props.itemData.id)}>
        <img className="img" src={props.itemData.image_url} alt="Not available" />
        <div className="content">
        <p className="text">{props.itemData.name}</p>
        <p className="details"> {props.renderItemDetails && props.itemData.end_date && props.renderItemDetails(props.itemData.end_date)}</p>
        </div>
    </div>
    );
};

export const ListItem = ListItemComponent;
