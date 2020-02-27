import React from 'react';
import { Nav } from 'react-bootstrap';
import { BsHouse, BsHouseFill, BsSearch, BsPeople, BsDocument } from 'react-icons/bs';
import * as ROUTES from '../../Constants/Routes';
import { withFirebase } from '../../Firebase';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';

const NavBarComponent: React.FC<FirebaseProps> = (props) => {

    const history = useHistory();

    return(
  props.firebase.getUserId() ?
    (
      <div className="navbar">
                     <BsHouse size={50} onClick={() => history.push(ROUTES.HOME)}/>
                     <BsSearch size={45} onClick={() => history.push(ROUTES.PUBLIC)}/>
                     <BsPeople size={50} onClick={() => history.push(ROUTES.PUBLIC)}/>
                     <BsDocument size={50} onClick={() => history.push(ROUTES.CONVO_LIST)}/>
      </div>
    )
    : null
    );
};

export const MainNavBar = withFirebase(NavBarComponent);
