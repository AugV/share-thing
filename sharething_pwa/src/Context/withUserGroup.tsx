import React from 'react';
import { UserGroupContext } from '../Routes/Private';
import { GroupNameAndId } from '../Entities/Interfaces';

interface UserGroups {
    userGroups: GroupNameAndId[];
}

const WithUserGroups = <P extends object>
(Component: React.ComponentType<P>): React.FC<Omit<P, keyof UserGroups>> => props => (
      <UserGroupContext.Consumer>
        {(userGroups: any) => <Component {...props as P} userGroups={userGroups} />}
      </UserGroupContext.Consumer>
    );

export const withUserGroups = WithUserGroups;
