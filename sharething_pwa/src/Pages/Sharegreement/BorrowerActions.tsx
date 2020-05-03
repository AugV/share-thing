import React, { useState } from 'react';
import { SHAREG_STATUS, SharegResponse } from '../../Entities/Interfaces';
import { Button } from 'antd';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { DateModal } from './DateModal';
import { DateRange } from '../../Entities/Types';

interface SharegActionsProps {
    shareg: SharegResponse;
    status: number;
}

const BorrowerActionsComp: React.FC<SharegActionsProps & FirebaseProps> = (props) => {
    const { shareg, status, firebase } = props;
    const [modalVisible, setmodalVisible] = useState(false);

    const abortSharegreement = () => {
        firebase.abortSharegreement(shareg.id);
    };

    const advanceStatus = () => {
        firebase.advanceSharegStatus(shareg.id, status);
    };

    const declineSharegreement = () => {
        firebase.declineSharegreement(shareg.id);
    };

    const offerNewDates = (dates: DateRange) => {
        firebase.setSharegNewDates(shareg.id, 'borrower', dates).then(() => {
            setmodalVisible(false);
        });
    };

    const itemIsBorrowed = () => {
        firebase.addItemToBorrowedItems(shareg);
    };

    const itemReturned = () => {
        firebase.borrowerItemReturned(shareg);
    };

    const renderBorrowerActions = () => {
        switch (status) {
            case SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM:
                return (
                    <>
                        <p>Waiting for owner to confirm the offered date</p>
                        <Button type="link" onClick={declineSharegreement}>Decline</Button>
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
                        <Button type="link" onClick={abortSharegreement}>Abort</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_DISPATCHED:
                return (
                    <>
                        <Button type="link" onClick={abortSharegreement}>Abort</Button>
                        <Button onClick={() => {advanceStatus(); itemIsBorrowed(); }}>Item Received</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_DISPATCHED:
                return (
                    <>
                        <Button onClick={() => {advanceStatus(); itemReturned(); }}>Item returned</Button>
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
                        <p>Owner confirmed that item was returned Sharegreement is finished</p>
                    </>
                );
            case SHAREG_STATUS.ABORTED:
                return (
                <>
                    <p>Sharegreement was aborted</p>
                </>
                );
            case SHAREG_STATUS.DECLINED:
                return (
                    <>
                        <p>Sharegreement was declined</p>
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
