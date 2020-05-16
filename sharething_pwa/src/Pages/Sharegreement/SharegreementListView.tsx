import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import { SharegResponse } from '../../Entities/Interfaces';

import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { SharegreementList } from './SharegrementList';
import { Header } from '../../Components/Headers/Header';
import { Spin, Tabs } from 'antd';

const { TabPane } = Tabs;

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
      <div style={{ margin: '5px' }}>
          {loading && <Spin />}
          <Tabs defaultActiveKey="asOwner">
            {asOwnerConversations && (
              <TabPane key="asOwner" tab="As Owner" >
                  <SharegreementList sharegreements={asOwnerConversations}/>
              </TabPane>
            )}
            {asSeekerConversations && (
              <TabPane key="asSeeker" tab="As Seeker">
                  <SharegreementList sharegreements={asSeekerConversations}/>
              </TabPane>
            )}
          </Tabs>
      </div>
      <MainNavBar activeIcon="shareg"/>
      </div>
    );
};

export const SharegreementListView = withFirebase(SharegreementListViewComp);
