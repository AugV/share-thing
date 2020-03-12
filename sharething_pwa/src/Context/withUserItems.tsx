import React from 'react';
import { UserItemContext } from '../Routes/Private';
import { UserItemsDocument } from '../Entities/Interfaces';

interface UserItems {
    userItems: UserItemsDocument;
}

const WithUserItems = <P extends object>
(Component: React.ComponentType<P>): React.FC<Omit<P, keyof UserItems>> => props => (
      <UserItemContext.Consumer>
        {(userItems: any) => <Component {...props as P} userItems={userItems} />}
      </UserItemContext.Consumer>
    );

export const withUserItems = WithUserItems;
