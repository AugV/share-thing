import React from 'react';
import './headers.css';
import { Dropdown } from '../Dropdown/Dropdown';
import * as ROUTES from '../../Constants/Routes';

const HomeHeaderComponent: React.FC<any> = () => {

    const selectionItems: Map<string, string> = getMapForDropdown();

    function getMapForDropdown(): Map<string, string> {
        const map: Map<string, string> = new Map<string, string>();
        map.set(ROUTES.MY_ITEMS, 'My Items');
        map.set(ROUTES.LENT_ITEMS, 'Lent Items');
        map.set(ROUTES.CONVO_LIST, 'Borrowed Items');
        return map;
    }

    return(
    <div className="home-header">
      <Dropdown selectionItems={selectionItems}/>
    </div>
    );
};

export const HomeHeader = HomeHeaderComponent;
