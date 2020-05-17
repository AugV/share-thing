import React, { useState } from 'react';
import { SHAREG_STATUS, SharegResponse } from '../../Entities/Interfaces';
import { Button } from 'antd';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { DateModal } from '../../Components/DatePicker/DateModal';
import { DateRange } from '../../Entities/Types';
import i18n from 'i18next';

interface SharegActionsProps {
    shareg: SharegResponse;
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
                        <p>{i18n.t('borroweWantsToBorrow')}</p>
                        <Button onClick={declineSharegreement}>{i18n.t('decline')}</Button>
                        <Button onClick={advanceStatus}>{i18n.t('confirm')}</Button>
                        <Button onClick={() => setmodalVisible(true)}>{i18n.t('anotherDate')}</Button>
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
                        <p>{i18n.t('waitingForBorrowerToConfirm')}</p>
                        <Button type="link" onClick={declineSharegreement}>{i18n.t('decline')}</Button>
                    </>
                );
            case SHAREG_STATUS.DATES_CONFIRMED:
                return (
                    <>
                        <Button type="link" onClick={abortSharegreement}>{i18n.t('abort')}</Button>
                        <Button onClick={() => {advanceStatus(); itemIsLent(); }}>{i18n.t('itemGiven')}</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_DISPATCHED:
                return (
                    <>
                        <p>{i18n.t('waitingBorrowerReceived')}</p>
                        <Button onClick={() => {abortSharegreement(); itemReturned(); }}>{i18n.t('abort')}</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_DISPATCHED:
                return (
                    <>
                        <p>{i18n.t('waitingBorrowerReturn')}</p>
                        <Button onClick={() => {abortSharegreement(); itemReturned(); }}>{i18n.t('abort')}</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_RETURNED:
                return (
                    <>
                        <Button type="link" onClick={abortSharegreement}>{i18n.t('abort')}</Button>
                        <Button onClick={() => {advanceStatus(); itemReturned(); }}>
                            {i18n.t('confirmAndFinish')}
                        </Button>
                    </>
                );
            case SHAREG_STATUS.FINISHED:
                return (
                    <>
                        <p>{i18n.t('finished')}</p>
                    </>
                );
            case SHAREG_STATUS.ABORTED:
                return (
                    <>
                        <p>{i18n.t('aborted')}</p>
                    </>
                );
            case SHAREG_STATUS.DECLINED:
                return (
                    <>
                        <p>{i18n.t('declined')}</p>
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
