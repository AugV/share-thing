import React from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { GroupList } from './GroupList';
import { CreateGroup } from './CreateGroup';
import { withFirebase } from '../../Firebase/Context';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { GroupDetails } from './GroupDetails';
import { GroupModelSend } from '../../Entities/Interfaces';

const GroupRoutes: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;
    const history = useHistory();

    const fetchSingleGroup = (groupId: string) => {
        return firebase.fetchSingleGroup(groupId);
    };

    const createGroup = (group: GroupModelSend) => {
        return firebase.createGroup(group).then(() => {
            history.push(ROUTES.GROUP_LIST);
        });
    };

    const getUserList = () => {
        return firebase.getAllUsers();
    };

    return(
        <Switch>
            <Route
                path={ROUTES.GROUP_LIST}
                component={GroupList}
            />
            <Route
                path={ROUTES.GROUP_NEW}
                render={(propss) => (
                    <CreateGroup
                        {...propss}
                        createGroup={createGroup}
                        getUserList={getUserList}
                    />
                    )}
            />
            <Route
                path={ROUTES.GROUP_DETAILS_ID}
                render={(propss) => (
                    <GroupDetails {...propss} fetchData={fetchSingleGroup}/>
                    )}
            />
        </Switch>
    );
};

export const Group = withFirebase(GroupRoutes);
