import React from 'react';
import { withFirebase } from '../../Firebase';
import { UserItem } from '../../Entities/Interfaces';
import { List } from '../../Components/List/List';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface LentItemsProps {
    itemList: UserItem[];
}

const LentItemsPageComp: React.FC<LentItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    // TODO: paklaust kodėl taip neveikia
    // const renderUntilDate = (date: Date ) => (
    const renderUntilDate = (date: Date | string) => (
        // <> {`until ${date ? date.toDateString() : 'miau'}`} </>
        <> {`until ${date ? date.toString() : 'miau'}`} </>
    );

    const onClickItem = (id: string) => {
        history.push(`${ROUTES.EDIT_ITEM_BASE}/${id}`);
    };

    return (
          <div>
            <List
                  itemList={props.itemList}
                  renderItemDetails={renderUntilDate}
                  onClickItem={onClickItem}
            />
          </div>
    );
};

export const LentItemsPage = withFirebase(LentItemsPageComp);
