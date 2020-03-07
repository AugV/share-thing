import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import './headers.css';

const BackArrowButton: React.FC = () => {
    const history = useHistory();

    const navigateBack = () => {
        history.goBack();
    };

    return(
        <div onClick={navigateBack}>
            <BsChevronLeft size={50}/>
        </div>
    );
};

export const BackArrow = BackArrowButton;
