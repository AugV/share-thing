import React from 'react';
import { BackArrow } from './BackArrow';
import './headers.css';

interface SubPageHeaderProps {
    title: string;
}

const SubPageHeaderComponent: React.FC<SubPageHeaderProps> = (props) => (
    <div className="home-header">
        <div className="back-arrow-button">
            <BackArrow/>
        </div>
        <div className="sub-page-title-box">
            <div className="sub-page-title">
                {props.title}
            </div>
        </div>
    </div>
);

export const SubPageHeader = SubPageHeaderComponent;
