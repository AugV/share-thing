import React, { useEffect, useState } from 'react';
import { BsHouse, BsSearch, BsPeople, BsDocument } from 'react-icons/bs';
import * as ROUTES from '../../Constants/Routes';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

const BottomNavBarComponent: React.FC<FirebaseProps> = (props) => {

    const initialValues = () => {
        return { home: 'inactive', search: 'inactive', groups: 'inactive', shareg: 'inactive' };
    };
    const history = useHistory();
    const location = useLocation();
    const [isActive, setIsActive] = useState(initialValues());

    useEffect(() => {
        const iconActivity = initialValues();
        switch (location.pathname) {
            case ROUTES.HOME:
                iconActivity.home = 'active';
                break;
            case ROUTES.CONVO_LIST:
                iconActivity.shareg = 'active';
                break;
            default:
        }
        setIsActive(iconActivity);
    }, [location]);

    return(
  props.firebase.getUserId() ?
    (
      <div className="navbar">
        <BsHouse className={isActive.home} size={50} onClick={() => history.push(ROUTES.HOME)}/>
        <BsSearch size={45} onClick={() => history.push(ROUTES.PUBLIC)}/>
        <BsPeople size={50} onClick={() => history.push(ROUTES.PUBLIC)}/>
        <BsDocument className={isActive.shareg} size={50} onClick={() => history.push(ROUTES.CONVO_LIST)}/>
      </div>
    )
    : null
    );
};
 
export const MainNavBar = withFirebase(BottomNavBarComponent);
