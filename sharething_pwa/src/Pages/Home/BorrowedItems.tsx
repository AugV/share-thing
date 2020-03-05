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

const BorrowedItemsPageComp: React.FC<BorrowedItemsProps & FirebaseProps> = (props) => {

    const history = useHistory();

    // TODO: paklaust kodėl taip neveikia
    // const renderUntilDate = (date: Date ) => (
    const renderUntilDate = (date: Date | string) => (
        // <> {`until ${date ? date.toDateString() : ''}`} </>
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

export const BorrowedItemsPage = withFirebase(BorrowedItemsPageComp);
