import React from 'react';
import { withFirebase } from '../../Firebase';
import { UserItem } from '../../Entities/Interfaces';
import { List } from '../../Components/List/List';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface BorrowedItemsProps {
    itemList: UserItem[];
}

type RenderItemDetails = ((content: string | Date) => JSX.Element) | undefined;
const BorrowedItemsPageComp: React.FC<BorrowedItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    const renderUntilDate = (date: Date) => (
        <> {`until ${date ? date : ''}`} </>
    );

    const onClickItem = (id: string) => {
        history.push(`${ROUTES.SHAREGREEMENT}/${id}`);
    };

    return (
          <div>
            <List
                  itemList={props.itemList}
                  renderItemDetails={renderUntilDate as RenderItemDetails}
                  onClickItem={onClickItem}
            />
          </div>
    );
};

export const BorrowedItemsPage = withFirebase(BorrowedItemsPageComp);
