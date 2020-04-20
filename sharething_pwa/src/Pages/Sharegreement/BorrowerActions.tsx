import React, { useState } from 'react';
import { SHAREG_STATUS } from '../../Entities/Interfaces';
import { Button } from 'antd';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { DateModal } from './DateModal';
import { DateRange } from '../../Entities/Types';

interface SharegActionsProps {
    sharegId: string;
    status: number;
}

const BorrowerActionsComp: React.FC<SharegActionsProps & FirebaseProps> = (props) => {
    const { sharegId, status, firebase } = props;
    const [modalVisible, setmodalVisible] = useState(false);

    const abortSharegreement = () => {
        firebase.abortSharegreement(sharegId);
    };

    const advanceStatus = () => {
        firebase.advanceSharegStatus(sharegId, status);
    };

    const declineSharegreement = () => {
        firebase.declineSharegreement(sharegId);
    };

    const offerNewDates = (dates: DateRange) => {
        firebase.setSharegNewDates(sharegId, 'borrower', dates).then(() => {
            setmodalVisible(false);
        });
    };

    const renderBorrowerActions = () => {
        switch (status) {
            case SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM:
                return (
                    <>
                        <p>Waiting for owner to confirm the offered date</p>
                        <Button onClick={declineSharegreement}>Decline</Button>
                    </>
                );
            case SHAREG_STATUS.PENDING_BORROWER_DATE_CONFIRM:
                return (
                    <>
                        <Button onClick={declineSharegreement}>Decline</Button>
                        <Button onClick={advanceStatus}>Confirm</Button>
                        <Button onClick={() => setmodalVisible(true)}>Another date</Button>
                        <DateModal
                            visible={modalVisible}
                            closeModal={() => setmodalVisible(false)}
                            onModalSubmit={offerNewDates}
                        />
                    </>
                );
            case SHAREG_STATUS.DATES_CONFIRMED:
                return (
                    <>
                        <p>Waiting to receive the Item</p>
                        <Button onClick={abortSharegreement}>Abort</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_DISPATCHED:
                return (
                    <>
                        <Button onClick={abortSharegreement}>Abort</Button>
                        <Button onClick={advanceStatus}>Item Received</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_DISPATCHED:
                return (
                    <>
                        <Button onClick={advanceStatus}>Item returned</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_RETURNED:
                return (
                    <>
                        <p>Waiting for the owner to confirm that item was returned</p>
                    </>
                );
            case SHAREG_STATUS.FINISHED:
                return (
                    <>
                        <p>Owner confirmed that item was returned</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderBorrowerActions()}
        </>
    );
};

export const BorrowerActions = withFirebase(BorrowerActionsComp);
