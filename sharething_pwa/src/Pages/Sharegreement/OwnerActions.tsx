import React, { useState } from 'react';
import { SHAREG_STATUS, SharegreementModel } from '../../Entities/Interfaces';
import { Button } from 'antd';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { DateModal } from './DateModal';
import { DateRange } from '../../Entities/Types';

interface SharegActionsProps {
    shareg: SharegreementModel;
    status: number;
}

const OwnerActionsComp: React.FC<SharegActionsProps & FirebaseProps> = (props) => {
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
        firebase.setSharegNewDates(shareg.id, 'owner', dates).then(() => {
            setmodalVisible(false);
        });
    };

    const itemIsLent = () => {
        firebase.addItemToLentItems(shareg);
    };

    const itemReturned = () => {
        firebase.ownerItemReturned(shareg);
    };

    const renderOwnerActions = () => {
        switch (status) {
            case SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM:
                return (
                    <>
                        <Button onClick={declineSharegreement}>Decline</Button>
                        <Button onClick={advanceStatus} >Confirm</Button>
                        <Button onClick={() => setmodalVisible(true)}>Another date</Button>
                        <DateModal
                            visible={modalVisible}
                            closeModal={() => setmodalVisible(false)}
                            onModalSubmit={offerNewDates}
                        />
                    </>
                );
            case SHAREG_STATUS.PENDING_BORROWER_DATE_CONFIRM:
                return (
                    <>
                        <p>Waiting for a borrower to confirm the offered date</p>
                        <Button onClick={declineSharegreement}>Decline</Button>
                    </>
                );
            case SHAREG_STATUS.DATES_CONFIRMED:
                return (
                    <>
                        <Button onClick={abortSharegreement}>Abort</Button>
                        <Button onClick={() => {advanceStatus(); itemIsLent(); }}>Item given</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_DISPATCHED:
                return (
                    <>
                        <p>Waiting for borrower to confirm that he received the item</p>
                        <Button onClick={() => {abortSharegreement(); itemReturned(); }}>Abort</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_DISPATCHED:
                return (
                    <>
                        <p>Waiting for borrower to return the item</p>
                        <Button onClick={() => {abortSharegreement(); itemReturned(); }}>Abort</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_RETURNED:
                return (
                    <>
                        <Button onClick={abortSharegreement}>Abort</Button>
                        <Button onClick={() => {advanceStatus(); itemReturned(); }}>
                            Confirm Item Returned & Finish Sharegreement
                        </Button>
                    </>
                );
            case SHAREG_STATUS.FINISHED:
                return (
                    <>
                        <p>Sharegreement is finished</p>
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
            {renderOwnerActions()}
        </>
    );
};

export const OwnerActions = withFirebase(OwnerActionsComp);
