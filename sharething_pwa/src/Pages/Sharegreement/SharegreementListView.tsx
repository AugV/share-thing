import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import {
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { SharegreementModel } from '../../Entities/Interfaces';

import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { SharegreementList } from './SharegrementList';

interface Props {
    firebase: Firebase;
}

const SharegreementListViewComp = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [asOwnerConversations, setAsOwnerConversations] = useState<SharegreementModel[] | null>(null);
    const [asSeekerConversations, setAsSeekerConversations] = useState<SharegreementModel[] | null>(null);

    useEffect(() => {
        props.firebase.getOwnerSharegreements().then(sharegreements => {
            setAsOwnerConversations(sharegreements);
        });
        setLoading(false);
    }, [props.firebase]);

    useEffect(() => {
        props.firebase.getBorrowerSharegreements().then(sharegreements => {
            setAsSeekerConversations(sharegreements);
        });
        setLoading(false);
    }, [props.firebase]);

    return(
      <div>
          {loading && <Spinner animation="border" />}
          <Tabs defaultActiveKey="asOwner" id="uncontrolled-tab-example">
            {asOwnerConversations && (
              <Tab eventKey="asOwner" title="As Owner" >
                  <SharegreementList sharegreements={asOwnerConversations}/>
              </Tab>
            )}
            {asSeekerConversations && (
              <Tab eventKey="asSeeker" title="As Seeker">
                  <SharegreementList sharegreements={asSeekerConversations}/>
              </Tab>
            )}
          </Tabs>
          <MainNavBar activeIcon="shareg"/>
        </div>
    );
};

export const SharegreementListView = withFirebase(SharegreementListViewComp);
