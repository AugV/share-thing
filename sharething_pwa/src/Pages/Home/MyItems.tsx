import React from 'react';
import { withFirebase } from '../../Firebase';
import { ItemPreview } from '../../Entities/Interfaces';
import { NewButton } from '../../Components/NewButton/NewButton';
import { List } from '../../Components/List/List';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import i18n from 'i18next';

interface MyItemsProps {
    itemList: ItemPreview[];
}

const MyItemsPageComp: React.FC<MyItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    const onClickItem = (id: string) => {
        history.push(`${ROUTES.EDIT_ITEM}/${id}`);
    };

    const createNewItem = () => {
        history.push(ROUTES.ADD_ITEM);
    };

    return (
          <div>
            <NewButton title={i18n.t('addItem')} onClick={createNewItem}/>
            <List
                  itemList={props.itemList}
                  onClickItem={onClickItem}
            />
          </div>
    );
};

export const MyItemsPage = withFirebase(MyItemsPageComp);
