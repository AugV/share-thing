import React from 'react';
import './new-button.css';
import { BsPlus } from 'react-icons/bs';

interface NewButtonProps {
    title: string;
    onClick: () => void;
}

const NewButton: React.FC<NewButtonProps> = (props) => {
    const { title, onClick } = props;

    return(
        <div className="btn" onClick={onClick}>
            <BsPlus fontSize="50px"/>
            {title}
        </div>
    );
};

export { NewButton };
