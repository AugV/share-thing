import React from 'react';
import * as ROUTES from '../../Constants/Routes';
import { SharegreementListView } from './SharegreementListView';
import { Switch, Route } from 'react-router-dom';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { SharegResponse } from '../../Entities/Interfaces';
import { Sharegreement } from './Sharegreement';
import { withFirebase } from '../../Firebase';

const SharegRouter: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const getSharegreement = (id: string, listener: (shareg: SharegResponse) => void) => {
        return firebase.getSingleSharegreement(id, listener);
    };

    return (
        <Switch>
        <Route
            path={ROUTES.SHAREGREEMENT_LIST}
            component={SharegreementListView}
        />
        <Route
            path={ROUTES.SHAREGREEMENT_ID}
            render={(propss) => (
                <Sharegreement
                    fetchData={getSharegreement}
                    {...propss}
                />
            )}
        />
    </Switch>
    );
};

export const SharegreementRouter = withFirebase(SharegRouter);
