import React from 'react';
import { withFirebase } from '../../Firebase';
import { UserOwnedItem } from '../../Entities/Interfaces';
import { NewItemButton } from '../../Components/NewItemButton/NewItemButton';
import { ListGroup, Image, Spinner } from 'react-bootstrap';
import { ListItem } from '../../Components/List/ListItem';
import { List } from '../../Components/List/List';

interface MyItemsProps {
    itemList: UserOwnedItem[];
}

const MyItemsPageComp: React.FC<MyItemsProps> = (props) => {

    return (
          <div style={{ listStyleType: 'none' }}>
            <NewItemButton/>
            <List itemList={props.itemList}
            />
          </div>
    );
};

export const MyItemsPage = withFirebase(MyItemsPageComp);
