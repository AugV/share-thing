import React from 'react';

interface BasicHeaderProps {
    title: string;
}

const BasicHeader: React.FC<BasicHeaderProps> = (props) => (
    <div className="home-header">
        <div className="sub-page-title-box">
            <div className="sub-page-title">
                {props.title}
            </div>
        </div>
    </div>
);

export { BasicHeader };
