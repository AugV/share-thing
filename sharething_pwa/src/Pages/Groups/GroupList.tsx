import React from 'react';
import { GroupNameAndId } from '../../Entities/Interfaces';
import { withUserGroups } from '../../Context/withUserGroup';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import List from 'antd/lib/list';
import { BasicHeader } from '../../Components/Headers/BasicHeader';
import { NewButton } from '../../Components/NewButton/NewButton';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface OwnProps {
    userGroups: GroupNameAndId[];
}
const GroupListComponent: React.FC<OwnProps> = (props) => {
    const { userGroups } = props;

    const history = useHistory();

    const createNewGroup = () => {
        history.push(ROUTES.GROUP_NEW);
    };

    const openGroupDetails = (id: string) => {
        history.push(`${ROUTES.GROUP_DETAILS}/${id}`);
    };

    return(
        <React.Fragment>
            <BasicHeader title="Groups"/>
            <NewButton title="New Group" onClick={createNewGroup} />
            <List
                size="large"
                dataSource={userGroups}
                renderItem={group => (
                    <List.Item style={{ background: 'whitesmoke' }} onClick={() => {openGroupDetails(group.id); }}>
                        <h2>{group.name}</h2>
                    </List.Item>
                    )
                }
            />

            <MainNavBar activeIcon="groups"/>
        </React.Fragment>
    );
};

export const GroupList = withUserGroups(GroupListComponent);
