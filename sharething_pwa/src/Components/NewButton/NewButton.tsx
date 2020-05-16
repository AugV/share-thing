import React from 'react';
import './new-button.css';
import { BsPlus } from 'react-icons/bs';
import { Typography } from 'antd';

interface NewButtonProps {
    title: string;
    onClick: () => void;
}

const NewButton: React.FC<NewButtonProps> = (props) => {
    const { title, onClick } = props;

    return(
        <div className="btn" onClick={onClick}>
            <Typography>
                <BsPlus fontSize="50px"/>
                {title}
            </Typography>
        </div>
    );
};

export { NewButton };
