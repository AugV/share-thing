import React from 'react';
import './new-item-button.css';
import { BsPlus } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

const NewItemButtonComponent = () => {

    const history = useHistory();

    return(
    <div className="btn" onClick={() => {history.push(ROUTES.ADD_ITEM); }}>
            <BsPlus fontSize="50px"/>
            New Item
        </div>
    );
};

export const NewItemButton = NewItemButtonComponent;
