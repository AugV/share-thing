import React, { Component } from 'react';
import { BackArrow } from './BackArrow';
import './headers.css';

interface SubPageHeaderProps {
    title: string;
    action?: JSX.Element;
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
    <div className="action-icon">
            {props.action}
        </div>
    </div>
);

export const SubPageHeader = SubPageHeaderComponent;
