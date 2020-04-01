import React from 'react';
import { GroupNameAndId } from '../../Entities/Interfaces';
import { withUserGroups } from '../../Context/withUserGroup';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';

interface OwnProps {
    userGroups: GroupNameAndId[];
}
const GroupListComponent: React.FC<OwnProps> = (props) => {
    return(
        <React.Fragment>
        <p>header</p>
        <p>new button</p>
        <p>List</p>

    <MainNavBar activeIcon="groups"/>
        </React.Fragment>
    );
};

export const GroupList = withUserGroups(GroupListComponent);
