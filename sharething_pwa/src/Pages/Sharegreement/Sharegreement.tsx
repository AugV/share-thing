import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { SharegResponse } from '../../Entities/Interfaces';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { Tabs, Tab } from 'react-bootstrap';
import { Chat } from './Chat';
import { SharegreementDetails } from './SharegreementDetails';

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
                    <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                        <Tab eventKey="details" title="Details" >
                            <SharegreementDetails sharegData={sharegreement}/>
                        </Tab>

                        <Tab eventKey="chat" title="Chat">
                            <Chat details={sharegreement}/>
                        </Tab>
                    </Tabs>
                    </>
                )
            }
        </React.Fragment>
    );
};

export { Sharegreement };
