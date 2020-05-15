import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import {
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { SharegResponse } from '../../Entities/Interfaces';

import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { SharegreementList } from './SharegrementList';
import { Header } from '../../Components/Headers/Header';

interface Props {
    firebase: Firebase;
}

const SharegreementListViewComp = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [asOwnerConversations, setAsOwnerConversations] = useState<SharegResponse[] | null>(null);
    const [asSeekerConversations, setAsSeekerConversations] = useState<SharegResponse[] | null>(null);

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
          <Header title="Sharegreements"/>
          {loading && <Spinner animation="border" />}
          {asOwnerConversations && <SharegreementList sharegreements={asOwnerConversations!}/>}
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
