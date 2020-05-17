import React from 'react';
import { GroupNameAndId } from '../../Entities/Interfaces';
import { withUserGroups } from '../../Context/withUserGroup';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import List from 'antd/lib/list';
import { Header } from '../../Components/Headers/Header';
import { NewButton } from '../../Components/NewButton/NewButton';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import i18n from 'i18next';

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

            <Header title={i18n.t('groups')}/>
            <NewButton title={i18n.t('createGroup')} onClick={createNewGroup} />

            <List
                size="large"
                dataSource={userGroups}
                renderItem={group => (
                    <List.Item style={{ background: 'whitesmoke' }} onClick={() => {openGroupDetails(group.id); }}>
                        <h2 style={{ marginLeft: '10px' }}>{group.name}</h2>
                    </List.Item>
                    )
                }
            />

            <MainNavBar activeIcon="groups"/>

        </React.Fragment>
    );
};

export const GroupList = withUserGroups(GroupListComponent);
