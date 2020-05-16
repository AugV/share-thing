import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { SharegResponse } from '../../Entities/Interfaces';
import { useParams } from 'react-router-dom';
import { Spin, Tabs } from 'antd';

import { Chat } from './Chat';
import { SharegreementDetails } from './SharegreementDetails';

const { TabPane } = Tabs;

interface SharegDetailsProps {
    fetchData: (id: string, listener: (sharegreement: SharegResponse) => void) => () => void;
}

const Sharegreement: React.FC<SharegDetailsProps> = (props) => {
    const { fetchData } = props;
    const { id } = useParams();
    const [sharegreement, setSharegreement] = useState<SharegResponse | undefined>(undefined);

    const updateSharegreement = (sharegreement: SharegResponse) => {
        setSharegreement(sharegreement);
    };

    useEffect(() => {
        return fetchData(id!, updateSharegreement);
    }, []);

    return(
        <React.Fragment>
            {
                !sharegreement
                ? <Spin/>
                : (
                    <>
                    <SubPageHeader title={sharegreement.itemName}/>
                    <div style={{ margin: '10px' }}>
                    <Tabs defaultActiveKey="details" animated={false}>
                        <TabPane key="details" tab="Details" >
                            <SharegreementDetails sharegData={sharegreement}/>
                        </TabPane>

                        <TabPane key="chat" tab="Chat">
                            <Chat details={sharegreement}/>
                        </TabPane>
                    </Tabs>
                    </div>
                    </>
                )
            }
        </React.Fragment>
    );
};

export { Sharegreement };
