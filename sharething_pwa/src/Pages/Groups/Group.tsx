import React from 'react';

import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { GroupList } from './GroupList';

const Group: React.FC = (props) => {

    return(
        <Switch>
            <Route
                path={ROUTES.GROUP_LIST}
                component={GroupList}
            />
            <Route path={ROUTES.GROUP_NEW}/>
            <Route path={ROUTES.GROUP_DETAILS_ID}/>
        </Switch>
    );
};

export { Group };
