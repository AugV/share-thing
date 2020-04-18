import React from 'react';
import * as ROUTES from '../../Constants/Routes';
import { SharegreementListView } from './SharegreementListView';
import { Switch, Route } from 'react-router-dom';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { SharegreementModel } from '../../Entities/Interfaces';
import { SharegreementDetails } from './SharegreementDetails';
import { withFirebase } from '../../Firebase';

const SharegreementRouter: React.FC<FirebaseProps> = (props) => {
    const { firebase } = props;

    const getSharegreement = (id: string): Promise<SharegreementModel> => {
        return firebase.getSingleSharegreement(id);
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
                <SharegreementDetails
                    fetchData={getSharegreement}
                    {...propss}
                />
            )}
        />
    </Switch>
    );
};

export const Sharegreement = withFirebase(SharegreementRouter);
