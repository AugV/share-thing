import React from 'react';
import { DateRange } from '../../Entities/Types';

import { DateRangePicker, Modal } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import { ValueType } from 'rsuite/lib/DateRangePicker';
import { Typography } from 'antd';
import i18n from 'i18next';

interface DateModalProps {
    visible: boolean;
    closeModal: () => void;
    onModalSubmit: (dates: DateRange) => void;
}

const DateModal: React.FC<DateModalProps> = (props) => {
    const { visible: showModal, closeModal, onModalSubmit } = props;

    const modalSubmit = (dates: ValueType) => {
        if (dates.length > 1) {
            const startDate = formatDate(dates[0]!);
            const endDate = formatDate(dates[1]!);
            onModalSubmit([startDate, endDate]);
        } else {
            closeModal();
        }
    };

    function formatDate(date: Date): string {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('/');
    }

    return(
        <Modal
            show={showModal}
            size="sm"
            onHide={() => closeModal()}
        >
            <Modal.Body>
                <Typography.Title level={4}>
                    {i18n.t('selectDate')}
                </Typography.Title>
                <div className="field only-date">
                    <DateRangePicker
                        onOk={modalSubmit}
                        isoWeek={true}
                        showOneCalendar={true}
                        format="YYYY-MM-DD"
                        locale={{
                            sunday: `${i18n.t('sunday')}`,
                            monday: `${i18n.t('monday')}`,
                            tuesday: `${i18n.t('tuesday')}`,
                            wednesday: `${i18n.t('wednesday')}`,
                            thursday: `${i18n.t('thursday')}`,
                            friday: `${i18n.t('friday')}`,
                            saturday: `${i18n.t('saturday')}`,
                            ok: `${i18n.t('ok')}`,
                            today: `${i18n.t('today')}`,
                            yesterday: `${i18n.t('yesterday')}`,
                            last7Days: `${i18n.t('last7Days')}`,
                        }}
                        ranges={[]}
                    />
                </div>
          </Modal.Body>

        </Modal>
    );
};

export { DateModal };
