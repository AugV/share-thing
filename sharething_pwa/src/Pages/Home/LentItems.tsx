import React from 'react';
import { withFirebase } from '../../Firebase';
import { ItemPreview } from '../../Entities/Interfaces';
import { List } from '../../Components/List/List';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface LentItemsProps {
    itemList: ItemPreview[];
}

const LentItemsPageComp: React.FC<LentItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    const renderUntilDate = (date: Date | string) => (
        <> {`until ${date ? date.toString() : '*no date set*'}`} </>
    );

    const onClickItem = (id: string) => {
        history.push(`${ROUTES.SHAREGREEMENT}/${id}`);
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
