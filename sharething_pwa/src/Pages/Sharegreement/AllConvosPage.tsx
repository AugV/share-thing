import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import {
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { Sharegreement } from '../../Entities/Interfaces';
import { ConvoList } from '../Convo/ConvoList';
import { MainNavBar } from '../../Components/NavBar/BottomNavBar';

interface Props {
    firebase: Firebase;
}

const AllConvosPageComponent = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [asOwnerConversations, setAsOwnerConversations] = useState<Sharegreement[] | null>(null);
    const [asSeekerConversations, setAsSeekerConversations] = useState<Sharegreement[] | null>(null);

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
                  <ConvoList conversations={asOwnerConversations}/>
              </Tab>
            )}
            {asSeekerConversations && (
              <Tab eventKey="asSeeker" title="As Seeker">
                  <ConvoList conversations={asSeekerConversations}/>
              </Tab>
            )}
          </Tabs>
          <MainNavBar activeIcon="shareg"/>
        </div>
    );
};

export const SharegreementList = withFirebase(AllConvosPageComponent);
