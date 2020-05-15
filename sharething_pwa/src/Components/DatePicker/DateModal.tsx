import React from 'react';
import { DateRange } from '../../Entities/Types';

import { DateRangePicker, Modal } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import { ValueType } from 'rsuite/lib/DateRangePicker';

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
             <Modal.Title>
                Select date
            </Modal.Title>
            <Modal.Body>
            <div className="field only-date">
                <DateRangePicker
                    onOk={modalSubmit}
                    isoWeek={true}
                    showOneCalendar={true}
                    format="YYYY-MM-DD"
                    locale={{
                        sunday: 'Su',
                        monday: 'Mo',
                        tuesday: 'Tu',
                        wednesday: 'We',
                        thursday: 'Th',
                        friday: 'Fr',
                        saturday: 'Sa',
                        ok: 'OK',
                        today: 'Today',
                        yesterday: 'Yesterday',
                        last7Days: 'Last 7 days',
                    }}
                    ranges={[]}
                />
                </div>
          </Modal.Body>

        </Modal>
    );
};

export { DateModal };
