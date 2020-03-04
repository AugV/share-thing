import React from 'react';
import './headers.css';
import { Dropdown } from '../Dropdown/Dropdown';

interface HeaderProps {
    subPages: Map<string, string>;
}

const HeaderComponent: React.FC<HeaderProps> = (props) => (
    <div className="home-header">
      <Dropdown selectionItems={props.subPages}/>
    </div>
);

export const HomeHeader = HeaderComponent;
