import React from 'react';

interface BasicHeaderProps {
    title: string;
    action?: JSX.Element;
}

const Header: React.FC<BasicHeaderProps> = (props) => (
    <div className="home-header">
        <div className="sub-page-title-box">
            <div className="sub-page-title">
                {props.title}
            </div>
            {props.action &&
                (
                    <div className="action-icon">
                        {props.action}
                    </div>
                )
            }
        </div>
    </div>
);

export { Header };
