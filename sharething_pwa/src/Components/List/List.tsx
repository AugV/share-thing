import React from 'react';
import { UserItem } from '../../Entities/Interfaces';
import { ListItem } from './ListItem';
import Spinner from 'react-bootstrap/Spinner';

interface ListProps {
    itemList: UserItem[];
    renderItemDetails?: (content: string | Date) => JSX.Element;
    onClickItem: (id: string) => void;
}

const ListComponent: React.FC<ListProps> = (props) => {

    return(
    <div className="list">
    {props.itemList ?
        props.itemList.map((item, index) => (
       <ListItem
                key={item.id}
                itemData={item}
                renderItemDetails={props.renderItemDetails || undefined}
                onClickItem={props.onClickItem}
        />
        ))
      :
      <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>
        }
    </div>
    ); };

export const List = ListComponent;
