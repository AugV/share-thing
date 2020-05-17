import React from 'react';
import './dropdowns.css';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

interface DropDownProps {
    selectionItems: Map<string, string>;
}

const DropdownComponent: React.FC<DropDownProps> = (props) => {
    const linkList = Array.from(props.selectionItems, ([key, value]) => ({ route: key, name: value }));

    const location = useLocation();

    return(
        <div className="dropdown">
            <button className="dropbtn">
                <Typography style={{ fontSize: '20pt' }}>
                    <span style={{ fontSize: '20px', marginLeft: '2px', marginRight: '2px' }}>&#x25bc;</span>
                    {props.selectionItems.get(location.pathname)}
                </Typography>
            </button>
            <div className="dropdown-content">
            {
            linkList.map((value, key) => (
                <Link className={'item'} key={key} to={value.route}>{value.name}</Link>
            ))
            }
            </div>
        </div>
    );
};

export const Dropdown = DropdownComponent;
