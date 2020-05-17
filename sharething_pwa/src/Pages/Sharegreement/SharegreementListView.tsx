import React, { useState, useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';
import { SharegResponse } from '../../Entities/Interfaces';

import { MainNavBar } from '../../Components/NavBar/BottomNavBar';
import { SharegreementList } from './SharegrementList';
import { Header } from '../../Components/Headers/Header';
import { Spin, Tabs } from 'antd';
import i18n from 'i18next';

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
      <Header title={i18n.t('sharegreements')}/>
      <div style={{ margin: '5px' }}>
          {loading && <Spin style={{ position: 'fixed', top: '50%', left: '50%' }}/>}
          <Tabs defaultActiveKey="asOwner">
            {asOwnerConversations && (
              <TabPane key="asOwner" tab={i18n.t('asOwner')} >
                  <SharegreementList sharegreements={asOwnerConversations}/>
              </TabPane>
            )}
            {asSeekerConversations && (
              <TabPane key="asSeeker" tab={i18n.t('asBorrower')}>
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
