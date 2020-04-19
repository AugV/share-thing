import React from 'react';
import { SHAREG_STATUS } from '../../Entities/Interfaces';
import { Button } from 'antd';

interface SharegActionsProps {
    status: number;
    role: string;
}

const SharegreementActions: React.FC<SharegActionsProps> = (props) => {
    const { status, role } = props;

    const renderOwnerActions = () => {
        switch (status) {
            case SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM:
                return (
                <>
                <Button>Decline</Button>
                <Button>Confirm</Button>
                <Button>Another date</Button>
                </>
                );
            case SHAREG_STATUS.PENDING_BORROWER_DATE_CONFIRM:
                return <Button>Decline</Button>;
            case SHAREG_STATUS.DATES_CONFIRMED:
                return (
                    <>
                    <Button>Abort</Button>
                    <Button>Item given</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_DISPATCHED:
                return (
                    <>
                    <p>Waiting for borrower to confirm that he received the item</p>
                    <Button>Abort</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_DISPATCHED:
                return (
                    <>
                    <Button>Abort</Button>
                    <Button>Item Returned</Button>
                    </>
                );
            case SHAREG_STATUS.BORROWER_ITEM_RETURNED:
                return (
                    <>
                    <Button>Abort</Button>
                    <Button>Confirm Item Returned</Button>
                    </>
                );
            case SHAREG_STATUS.OWNER_ITEM_RETURNED:
                return (
                    <>
                    <Button>Close Sharegreement</Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
        {role === 'owner'
        && renderOwnerActions()}
        </>
    );
};

export { SharegreementActions };
