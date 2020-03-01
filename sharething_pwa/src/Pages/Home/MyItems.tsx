import React from 'react';
import { withFirebase } from '../../Firebase';
import { UserOwnedItem } from '../../Entities/Interfaces';
import { NewItemButton } from '../../Components/NewItemButton/NewItemButton';

interface MyItemsProps {
    itemList: UserOwnedItem[];
}

const MyItemsPageComp: React.FC<MyItemsProps> = (props) => {

    return (
          <div>
            {console.log(props.itemList)}
            {/* {props.ownedItems && props.ownedItems[1].itemId} */}
            <NewItemButton/>
              {/* {items.map((item, index) => ())} */}
          </div>
    );
};

export const MyItemsPage = withFirebase(MyItemsPageComp);
