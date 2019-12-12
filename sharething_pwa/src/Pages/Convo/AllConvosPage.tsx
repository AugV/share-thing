import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import {
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { docToConvo, ConversationInfo } from '../../Entities/Interfaces';
import { ConvoList } from './ConvoList';

interface Props {
    firebase: Firebase;
}
// TODO: optimize so that lazy loads on active Tab
const AllConvosPageComponent = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [asOwnerConversations, setAsOwnerConversations] = useState<ConversationInfo[] | null>(null);
    const [asSeekerConversations, setAsSeekerConversations] = useState<ConversationInfo[] | null>(null);

    useEffect(() => {
        const unsubscribe = props.firebase.getAsOwnerConversations().onSnapshot(snapshot => {
            setAsOwnerConversations(snapshot.docs.map(docToConvo)); });
        setLoading(false);
        return unsubscribe;
    }, [props.firebase]);

    useEffect(() => {
        const unsubscribe = props.firebase.getAsSeekerConversations().onSnapshot(snapshot => {
            setAsSeekerConversations(snapshot.docs.map(docToConvo)); });
        setLoading(false);
        return unsubscribe;
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
        </div>
    );
};

export const AllConvosPage = withFirebase(AllConvosPageComponent);
