import React from 'react';
import { withFirebase } from '../../Firebase';
import { ItemPreview } from '../../Entities/Interfaces';
import { NewItemButton } from '../../Components/NewItemButton/NewItemButton';
import { List } from '../../Components/List/List';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface MyItemsProps {
    itemList: ItemPreview[];
}

const MyItemsPageComp: React.FC<MyItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    const onClickItem = (id: string) => {
        history.push(`${ROUTES.EDIT_ITEM}/${id}`);
    };

    return (
          <div>
            <NewItemButton/>
            <List
                  itemList={props.itemList}
                  onClickItem={onClickItem}
            />
          </div>
    );
};

export const MyItemsPage = withFirebase(MyItemsPageComp);
