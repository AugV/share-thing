import React from 'react';

import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { GroupList } from './GroupList';
import { CreateGroup } from './CreateGroup';
import { withFirebase } from '../../Firebase/Context';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { GroupDetails } from './GroupDetails';

const GroupRoutes: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const fetchSingleGroup = (groupId: string) => {
        return firebase.fetchSingleGroup(groupId);
    };

    return(
        <Switch>
            <Route
                path={ROUTES.GROUP_LIST}
                component={GroupList}
            />
            <Route path={ROUTES.GROUP_NEW} component={CreateGroup}/>
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
