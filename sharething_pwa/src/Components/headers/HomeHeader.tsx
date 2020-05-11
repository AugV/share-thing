import React from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import './headers.css';

interface HeaderProps {
    subPages: Map<string, string>;
    action?: JSX.Element;
}

const HomeHeader: React.FC<HeaderProps> = (props) => (
  <div className="home-header">
    <Dropdown selectionItems={props.subPages}/>
    {props.action &&
        (
            <div className="action-icon">
                {props.action}
            </div>
        )
    }
  </div>
);

export { HomeHeader };
