import React, { useState } from 'react';
import { Modal, DatePicker } from 'antd';
import { DateRange } from '../../Entities/Types';
const { RangePicker } = DatePicker;

interface DateModalProps {
    visible: boolean;
    closeModal: () => void;
    onModalSubmit: (dates: DateRange) => void;
}

const DateModal: React.FC<DateModalProps> = (props) => {
    const { visible: showModal, closeModal, onModalSubmit } = props;
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const selectedDateChanges = (undefined: unknown, dates: DateRange) => {
        setDateRange(dates);
    };

    const modalSubmit = () => {
        if (dateRange) {
            onModalSubmit(dateRange);
        } else {
            closeModal();
        }
    };

    return(
        <Modal
            title="Pick a date range"
            centered={true}
            visible={showModal}
            onOk={() => modalSubmit()}
            onCancel={() => closeModal()}
        >
            <RangePicker onChange={selectedDateChanges} size="large" showTime={true} format="YYYY/MM/DD"/>
        </Modal>
    );
};

export { DateModal };
