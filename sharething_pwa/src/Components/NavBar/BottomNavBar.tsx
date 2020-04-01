import React from 'react';
import { BsHouse, BsSearch, BsPeople, BsDocument } from 'react-icons/bs';
import * as ROUTES from '../../Constants/Routes';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useHistory } from 'react-router-dom';
import './BottomNavBar.css';

interface ActiveIconProp {
    activeIcon: string;
}
interface NavIcons {
    home: string;
    search: string;
    groups: string;
    shareg: string;
    [key: string]: string;
}
type BottomNavProps = FirebaseProps & ActiveIconProp;

const BottomNavBarComponent: React.FC<BottomNavProps> = (props) => {
    const isActive: NavIcons = { home: 'inactive', search: 'inactive', groups: 'inactive', shareg: 'inactive' };
    isActive[props.activeIcon] = 'active';

    const history = useHistory();

    return(
    props.firebase.getUserId() ?
    (
      <div className="navbar">
        <BsHouse className={isActive.home} size={50} onClick={() => history.push(ROUTES.MY_ITEMS)}/>
        <BsSearch className={isActive.search} size={45} onClick={() => history.push(ROUTES.SEARCH)}/>
        <BsPeople className={isActive.groups} size={50} onClick={() => history.push(ROUTES.GROUP_LIST)}/>
        <BsDocument className={isActive.shareg} size={50} onClick={() => history.push(ROUTES.SHAREGREEMENT_LIST)}/>
      </div>
    )
    : null
    );
};

export const MainNavBar = withFirebase(BottomNavBarComponent);
