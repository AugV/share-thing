import React from 'react';
import { UserOwnedItem, UserLentItem, UserBorrowedItem } from '../../Entities/Interfaces';
import { ListItem } from './ListItem';
import Spinner from 'react-bootstrap/Spinner';

interface ListProps {
    itemList: UserOwnedItem[] | UserLentItem[] | UserBorrowedItem[];
}

const ListComponent: React.FC<ListProps> = (props) => {

    console.log(props.itemList instanceof);

    return(
    <div style={{ listStyleType: 'none' }}>
    {/* {props. ?
        props.itemList.map((item, index) => (
       <ListItem key={item.item_id} itemData={item} />
      ))
      :
      <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>
        } */}
  </div>

    ); };

export const List = ListComponent;
